import { type NextRequest, NextResponse } from "next/server";
import { generateRandomWound } from "@/types/WoundAssessment";
import { UploadImageFormSchema } from "../../../types/UploadImageForm";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const { error } = UploadImageFormSchema.safeParse({
    image: formData.get("image"),
  });

  if (error) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 },
    );
  }

  try {
    const woundAssessment = generateRandomWound();

    return NextResponse.json(woundAssessment);
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
