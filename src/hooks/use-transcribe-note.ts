"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { type ClinicalNote, ClinicalNoteSchema } from "@/types/ClinicalNote";
import { useEffect, useState } from "react";

export const useTranscribeNote = () => {
  const [note, setNote] = useState<ClinicalNote>({
    chiefComplaint: "",
    diagnosis: "",
    examination: "",
    history: "",
    treatmentPlan: "",
  });
  const [showReport, setShowReport] = useState<boolean>();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [browserSupport, setBrowserSupport] = useState<boolean>(true);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(false);
  const {
    transcript,
    resetTranscript: reset,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setBrowserSupport(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);

  const startTranscribing = async () => {
    await SpeechRecognition.startListening({
      continuous: true,
    });
    setIsListening(true);
  };

  const stopTranscribing = async () => {
    await SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const generateClinicalNote = async () => {
    try {
      setIsReportLoading(true);
      const response = await fetch("/api/clinical-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate clinical note");
      }

      const note = ClinicalNoteSchema.parse(await response.json());

      setNote(note);
      setShowReport(true);
      setIsReportLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const resetTranscript: () => void = reset;
  const cancelReport = () => {
    resetTranscript();
    setNote({
      chiefComplaint: "",
      diagnosis: "",
      examination: "",
      history: "",
      treatmentPlan: "",
    });
    setShowReport(false);
  };

  return {
    browserSupport,
    browserSupportsSpeechRecognition,
    isListening,
    transcript,
    startTranscribing,
    stopTranscribing,
    resetTranscript,
    note,
    setNote,
    generateClinicalNote,
    showReport,
    cancelReport,
    isReportLoading,
  };
};
