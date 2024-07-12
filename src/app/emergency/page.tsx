"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState, useEffect, useRef } from "react";
import "./emergencypage.css";


declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const EmergencyPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setTranscript(currentTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech Recognition Error: ", event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) recognitionRef.current.start();
    };

    return () => {
      recognitionRef.current.stop();
    };
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current.stop();
  };

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleStart = () => {
    speak("Please remain calm. Can you tell me your address?");
    startListening();
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
            onClick={isListening ? stopListening : handleStart}
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
