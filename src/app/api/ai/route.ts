import { GoogleGenAI } from "@google/genai";
import { env } from "@/env";
import { NextResponse } from "next/server";
import { prompt, simplePrompt } from "@/lib/utils";

const ai = new GoogleGenAI({ apiKey: env.GOOGLE_GENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    const aiPrompt = prompt(url);

    console.log(aiPrompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          text: aiPrompt,
        },
        {
          fileData: {
            fileUri: url,
          },
        },
      ],
    });

    console.log(response);

    return NextResponse.json({ text: response.text });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
