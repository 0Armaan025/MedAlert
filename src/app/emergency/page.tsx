"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import "./emergencypage.css";
import { useVoiceToText } from "react-speakup";

const EmergencyPage = () => {
  const { startListening, stopListening, transcript } = useVoiceToText();
  const [isListening, setIsListening] = useState(false);
  const [transcriptFn, setTranscriptFn] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;

    recognitionInstance.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscriptFn(currentTranscript);
    };

    recognitionInstance.onend = () => {
      if (isListening) recognitionInstance.start();
    };

    if (isListening) recognitionInstance.start();

    return () => {
      recognitionInstance.stop();
    };
  }, [isListening]);

  const startListeningFn = () => {
    setIsListening(true);
    startListening();
  };

  const stopListeningFn = () => {
    setIsListening(false);
    stopListening();
    makeEmergencyCall();
  };

  const speak = (text: any) => {
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

  const makeEmergencyCall = async () => {
    try {
      const response = await axios.post(
        "https://medalert-api.onrender.com/makeEmergencyCall",
        {
          to: process.env.NEXT_PUBLIC_PHONE_NUMBER,
        }
      );

      console.log(response.data);
      alert("Emergency call initiated successfully.");
    } catch (error) {
      console.error("Error making Twilio call:", error);
      alert("Error making Twilio call.");
    }
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
        <h4 className="text-white mb-4">
          Please don't use it for fun or use it a lot, I only have $0.45 balance
          left in the twilio account ;-; (only for judges yet)
        </h4>
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
