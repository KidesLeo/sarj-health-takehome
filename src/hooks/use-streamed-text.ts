import { useEffect, useRef, useState } from "react";

export const useStreamedText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const textEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    textEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (text.length === 0) {
      setDisplayedText("");
      setIndex(0);
      return;
    }

    if (index < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex(index + 1);
        },
        text[index] === " " ? 8 : 5,
      );

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  useEffect(() => {
    text.length > 0 && scrollToBottom();
  }, [text]);

  return { displayedText, textEndRef };
};
