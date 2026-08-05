import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const systemInstruction = `You are an AI assistant for Dharamukh Sishu Bidya Niketon, a higher secondary school in Nagaon, Assam, India. You provide helpful, polite, and accurate information about the school.
If the user asks about something you don't know, use the Google Search tool to find the information, or politely say you do not know.`;

export async function POST(req: NextRequest) {
  try {
    const { history, message } = await req.json();

    // Use gemini-3.5-flash with search tool
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.warn("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
