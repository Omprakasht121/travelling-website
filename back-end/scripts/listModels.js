import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load .env explicitly for the standalone script
dotenv.config();

const ai = new GoogleGenAI({});

async function listModels() {
  try {
    const models = await ai.models.list(); // or ai.models.listModels()
    // but looking at sdk, usually just use fetch or another method if list doesn't exist
    // Actually, in @google/genai, ai.models might not have `list`. 
    // I am just going to try fetching gemini-2.0-flash
  } catch (error) {
    console.error(error);
  }
}
// listModels();
