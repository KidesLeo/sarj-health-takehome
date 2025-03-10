import { type ICareInstructions } from "./care-instructions";

export const useCareInstruction = ({ careInstructions }: ICareInstructions) => {
  return { careInstructions };
};
