import { useCareInstruction } from "./use-care-instructions";
import Markdown from "react-markdown";
import { useStreamedText } from "@/hooks/use-streamed-text";

export interface ICareInstructions {
  careInstructions: string;
}
export default function CareInstructions(props: ICareInstructions) {
  const { careInstructions } = useCareInstruction(props);
  const { displayedText, textEndRef } = useStreamedText({
    text: careInstructions,
  });
  return (
    <div className="h-fit w-5/6 max-w-4xl">
      <div className="font text-bpb-20 min-w-full pb-20">
        <Markdown>{displayedText}</Markdown>
        <div ref={textEndRef} />
      </div>
    </div>
  );
}
