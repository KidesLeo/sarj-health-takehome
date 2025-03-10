import { z } from "zod";

export const ClinicalNoteSchema = z.object({
  chiefComplaint: z.string(),
  history: z.string(),
  examination: z.string(),
  diagnosis: z.string(),
  treatmentPlan: z.string(),
});

export type ClinicalNote = z.infer<typeof ClinicalNoteSchema>;
