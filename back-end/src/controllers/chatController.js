import Content from '../models/Content.js';
import axios from 'axios';

// ─── System Prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `
You are "Bundeli Bot" 🪔 — a friendly, knowledgeable local tour guide and assistant for "The Unseen Bundelkhand" travel website.

Your ONLY expertise is the Bundelkhand region of India (Jhansi, Orchha, Mauranipur, Banda, Chitrakoot, Datia, Panna, etc.).

STRICT RULES:
1. ONLY answer questions about Bundelkhand — tourism, culture, history, food, hotels, travel tips, local festivals, best time to visit, distances, transport etc.
2. If asked anything NOT related to Bundelkhand or travel, politely say: "I'm only able to assist with Bundelkhand tourism topics. Is there anything about Bundelkhand I can help you with? 😊"
3. Keep your answers concise, friendly, and helpful — like a local guide talking to a tourist.
4. Use simple English (and basic Hindi words occasionally for authenticity — like "Namaste", "Dhanyavaad", "Ji").
5. When you recommend a place from the VERIFIED DATABASE below, mention it naturally.
6. If you don't know something specific, say so honestly rather than guessing.
7. Use emojis occasionally to keep the tone warm and welcoming 🏯🌿🍛.
`;

// ─── Main Handler ────────────────────────────────────────────────────────────
export const handleChatMessage = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, error: 'GEMINI_API_KEY missing.' });
    }

    // 1. Fetch top relevant DB places as grounding context
    const keywords = message.split(' ').filter(w => w.length > 3).slice(0, 5);
    const dbPlaces = await Content.find({
      $or: [
        { title: { $regex: keywords.join('|'), $options: 'i' } },
        { region: { $regex: keywords.join('|'), $options: 'i' } },
        { category: { $regex: keywords.join('|'), $options: 'i' } },
        { tags: { $in: keywords } }
      ]
    }).select('title region category description price').limit(8);

    const dbContext = dbPlaces.length > 0
      ? `\nVERIFIED DATABASE PLACES (use these when relevant):\n${JSON.stringify(
          dbPlaces.map(p => ({
            name: p.title,
            region: p.region,
            type: p.category,
            desc: p.description?.substring(0, 120) || '',
            price: p.price
          }))
        )}\n`
      : '';

    // 2. Build multi-turn contents array for Gemini
    //    Keep max last 10 exchanges to stay within token limits
    const recentHistory = history.slice(-10);

    const contents = [
      // Inject system prompt + db context as first user turn
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT + dbContext }]
      },
      {
        role: 'model',
        parts: [{ text: "Namaste! 🙏 I'm Bundeli Bot, your local guide to the Unseen Bundelkhand. How can I help you today?" }]
      },
      // Past conversation
      ...recentHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      // Current message
      {
        role: 'user',
        parts: [{ text: message.trim() }]
      }
    ];

    // 3. Call Gemini 2.5 Flash via Axios
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    console.log(`🤖 Chatbot: Sending to Gemini (${message.substring(0, 20)}...)`);

    const response = await axios.post(url, {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const data = response.data;
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      console.warn("⚠️ Chatbot: Empty response from Gemini");
      throw new Error('Empty response from Gemini');
    }

    console.log("✅ Chatbot: Response received");
    return res.status(200).json({ success: true, reply });

  } catch (error) {
    // Enhanced error logging
    if (error.response) {
      console.error("❌ Chat Controller API Error:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("❌ Chat Controller Local Error:", error.message);
    }

    return res.status(500).json({
      success: false,
      error: error.message || 'Something went wrong with the chatbot.'
    });
  }
};

