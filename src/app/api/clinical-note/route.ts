import { geminiFunctionSchema, genAI } from "@/lib/gemini";
import { ClinicalNoteSchema } from "@/types/ClinicalNote";
import { NextResponse } from "next/server";
import { ClinicalNote } from "../../../types/ClinicalNote";

interface ITranscript {
  transcript?: string;
}
export async function POST(req: Request) {
  try {
    const { transcript }: ITranscript = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: "Missing transcription text" },
        { status: 400 },
      );
    }

    const prompt = `
      You are a medical AI assistant. Convert the following raw dictation into a structured clinical note:
      ---
      ${transcript}
      ---
      Format it strictly in JSON:
      {
        "chiefComplaint": "...",
        "history": "...",
        "examination": "...",
        "diagnosis": "...",
        "treatmentPlan": "..."
      }

      If there is no relevant data simply state in the field that there is no relevant data available, do not return null
    `;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: geminiFunctionSchema.ClinicalNote,
      },
    });

    const response = await model.generateContent(prompt);
    const textResponse = response.response.text();
    try {
      const clinicalNote = ClinicalNoteSchema.parse(JSON.parse(textResponse));
      return NextResponse.json(clinicalNote, { status: 200 });
    } catch (error) {
      console.error("Invalid JSON:", error);

      return NextResponse.json("Gemini did not provide formatting", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error generating clinical note:", error);
    return NextResponse.json(
      { error: "Failed to generate clinical note" },
      { status: 500 },
    );
  }
}
