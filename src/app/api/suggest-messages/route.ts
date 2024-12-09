import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is not defined in the environment variables."
  );
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const runtime = "edge";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content from the API (assuming no native streaming support)
    const result = await model.generateContent(prompt);

    // Manually chunk the response for streaming
    const text = result.response.text(); // Full response text

    // Create a ReadableStream to send chunks
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const chunks = text.match(/.{1,50}/g) || []; // Split into 50-character chunks
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk)); // Enqueue each chunk
        }
        controller.close(); // Signal the end of the stream
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
