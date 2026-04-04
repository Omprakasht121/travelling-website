import Content from '../models/Content.js';

export const generateHybridItinerary = async (req, res) => {
  try {
    const { 
      days = 2, 
      regions = ["Jhansi", "Orchha"], 
      budget = "",
      travelType = "Solo",
      interests = [],
      transport = "Car",
      preferences = ""
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ success: false, error: "GEMINI_API_KEY is missing from .env!" });
    }

    // 1. Fetch "Anchors" from our static DB (strictly limit to 15 items to save tokens)
    const dbPlaces = await Content.find({
      $or: [
        { region: { $in: regions.map(r => r.toLowerCase()) } },
        { title: { $regex: /jhansi fort|orchha/i } }
      ]
    }).select('title region category description price mainImage').limit(15);

    // Convert verified DB places into a clean JSON string, truncating massive descriptions.
    const dbContextString = JSON.stringify(
      dbPlaces.map(place => ({
        id: place._id,
        name: place.title,
        type: place.category,
        region: place.region,
        desc: place.description ? place.description.substring(0, 100) : '',
        price: place.price,
        image: place.mainImage
      }))
    );

    // 2. The Text Prompt
    const promptText = `
      You are an expert, local travel planner for the Bundelkhand region of India.
      The user wants a ${days}-day itinerary covering ${regions.join(", ")}.
      
      Trip Profile:
      - Budget: ${budget || "Not specified"} (Estimate costs in ₹)
      - Travel Type: ${travelType}
      - Interests: ${interests.length > 0 ? interests.join(", ") : "General exploration"}
      - Preferred Transport: ${transport}
      - Additional Preferences: ${preferences || "None"}.

      I am providing you a JSON list of VERIFIED places from our database.
      
      5. If you use a VERIFIED DATABASE PLACE, you MUST include its exact "image" as "imageUrl". For AI suggested places, leave "imageUrl" as null.
      
      VERIFIED DATABASE PLACES:
      ${dbContextString}
    `;

    // 3. Define the strict JSON schema that Gemini MUST return
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
                     imageUrl: { type: "STRING" },
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

    // 4. Raw HTTP Fetch Call to Gemini (bypassing the buggy SDK)
    console.log("✈️ Sending strictly to gemini-2.5-flash via native fetch...");
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

    // 5. Handle any Google API Errors directly
    if (!fetchResponse.ok) {
      console.error("❌ Google API Error:", JSON.stringify(data.error, null, 2));
      throw new Error(`Google Generation Failed: ${data.error.message}`);
    }

    // 6. Extract the JSON and ship it to React!
    const generatedText = data.candidates[0].content.parts[0].text;
    const itineraryJson = JSON.parse(generatedText);

    res.status(200).json({
      success: true,
      message: "Hybrid itinerary successfully generated!",
      itinerary: itineraryJson,
      dbMatchesCount: dbPlaces.length
    });

  } catch (error) {
    console.error("❌ Final AI Planner Core Error:", error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message || "A fatal error occurred generating the AI trip." 
    });
  }
};
