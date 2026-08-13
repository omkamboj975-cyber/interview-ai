import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function testGemini() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: "Say hello and confirm that the Gemini API is working.",
        });

        console.log("Gemini API is working!");
        console.log(response.text);
    } catch (error) {
        console.log("Gemini API failed!");
        console.error(error);
    }
}

testGemini();