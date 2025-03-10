import { Schema, SchemaType } from "@google/generative-ai";

export const ClinicalNoteGeminiSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    chiefComplaint: {
      type: SchemaType.STRING,
      description:
        "The patient's primary reason for seeking medical attention.",
    },
    history: {
      type: SchemaType.STRING,
      description:
        "A detailed account of the patient's medical history relevant to the current complaint.",
    },
    examination: {
      type: SchemaType.STRING,
      description:
        "Objective findings from the physical examination of the patient.",
    },
    diagnosis: {
      type: SchemaType.STRING,
      description: "The identified medical condition or problem.",
    },
    treatmentPlan: {
      type: SchemaType.STRING,
      description:
        "The proposed course of action to manage the patient's condition.",
    },
  },
  required: [
    "chiefComplaint",
    "history",
    "examination",
    "diagnosis",
    "treatmentPlan",
  ],
};
