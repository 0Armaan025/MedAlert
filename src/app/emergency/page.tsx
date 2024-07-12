"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import "./emergencypage.css";
import { useVoiceToText } from "react-speakup";

interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

const EmergencyPage = () => {
  const { startListening, stopListening, transcript } = useVoiceToText();
  const [isListening, setIsListening] = useState(false);
  const [transcriptFn, setTranscriptFn] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;

    recognitionInstance.onresult = (event: any) => {
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setTranscriptFn(currentTranscript);
    };

    recognitionInstance.onend = () => {
      if (isListening) recognitionInstance.start();
    };

    setRecognition(recognitionInstance);

    return () => recognitionInstance.stop();
  }, [isListening]);

  const startListeningFn = () => {
    setIsListening(true);
    startListening();
  };

  const stopListeningFn = () => {
    setIsListening(false);
    stopListening();
  };

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleStart = () => {
    speak(
      "Please remain calm. Help is on the way, could you please define the whole situation if possible:"
    );
    startListeningFn();
  };

  return (
    <>
      <Navbar />
      <div className="emergency-page flex flex-col items-center p-8 min-h-screen">
        <h2
          className="text-3xl font-bold mb-6 text-white"
          style={{ fontFamily: "Poppins" }}
        >
          Emergency Assistance
        </h2>
        <div className="speaking-detection bg-white p-6 rounded-lg shadow-lg mb-8 w-full max-w-md text-center">
          <div className="animation-container mb-4">
            <div
              className={`wave-container ${
                isListening ? "listening" : ""
              } my-8`}
            >
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          </div>
          <button
            onClick={isListening ? stopListeningFn : handleStart}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-all cursor-pointer"
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        </div>
        <div className="transcription bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Transcription</h3>
          <div className="transcription-box h-32 overflow-y-auto border p-4 rounded-lg">
            {transcript || "No transcription yet."}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmergencyPage;
