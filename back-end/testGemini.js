import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './src/models/Content.js';

dotenv.config();

const testPlanner = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB!");

        const days = 2;
        const regions = ["Jhansi", "Orchha"];
        const preferences = "Budget stays, nearby local food, historical exploration";

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing!");
            process.exit(1);
        }
        console.log("API Key found. Fetching DB places...");

        // 1. Fetch
        const dbPlaces = await Content.find({
            $or: [
                { region: { $in: regions.map(r => r.toLowerCase()) } },
                { title: { $regex: /jhansi fort|orchha/i } }
            ]
        }).select('title region category description price').limit(15);

        console.log(`Found ${dbPlaces.length} places in DB.`);

        const dbContextString = JSON.stringify(
            dbPlaces.map(place => ({
                id: place._id,
                name: place.title,
                type: place.category,
                region: place.region,
                desc: place.description ? place.description.substring(0, 100) : '',
                price: place.price
            }))
        );

        const promptText = `
        You are an expert, local travel planner for the Bundelkhand region of India.
        The user wants a ${days}-day itinerary covering ${regions.join(", ")}.
        User Preferences: ${preferences}.
  
        I am providing you a JSON list of VERIFIED places from our database.
        
        CRITICAL INSTRUCTIONS:
        1. You MUST use places from the "VERIFIED DATABASE PLACES" list below whenever possible.
        2. If our database lacks enough good budget stays or nearby food options for a day, you MUST suggest realistic, real-world alternatives from your LLM knowledge to fill the gaps.
        3. Organize the itinerary logically by geography so travel time makes sense.
        4. For every place you use from the verified list, you MUST include its exact "id". For places you invent/suggest from your own knowledge, leave "id" as null.
  
        VERIFIED DATABASE PLACES:
        ${dbContextString}
      `;
  
      const responseSchema = {
        type: "OBJECT",
        properties: {
          tripTitle: { type: "STRING" },
          days: {
             type: "ARRAY",
             items: {
               type: "OBJECT",
               properties: {
                 dayNumber: { type: "INTEGER" },
                 theme: { type: "STRING" },
                 activities: {
                   type: "ARRAY",
                   items: {
                     type: "OBJECT",
                     properties: {
                       timeOfDay: { type: "STRING" },
                       placeName: { type: "STRING" },
                       category: { type: "STRING" },
                       dbId: { type: "STRING" },
                       isLlmSuggestion: { type: "BOOLEAN" },
                       whyGoHere: { type: "STRING" }
                     },
                     required: ["timeOfDay", "placeName", "category", "isLlmSuggestion", "whyGoHere"]
                   }
                 }
               },
               required: ["dayNumber", "theme", "activities"]
             }
          }
        },
        required: ["tripTitle", "days"]
      };

      console.log("Sending strictly to gemini-1.5-flash via native fetch...");
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const bodyPayload = {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
          responseSchema: responseSchema
        }
      };

      const fetchResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload)
      });

      const data = await fetchResponse.json();

      if (!fetchResponse.ok) {
        console.error("Google API Error:", JSON.stringify(data.error, null, 2));
        process.exit(1);
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      const itineraryJson = JSON.parse(generatedText);

      console.log("SUCCESS! Got itinerary:");
      console.log(JSON.stringify(itineraryJson, null, 2));
      process.exit(0);

    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
};

testPlanner();
