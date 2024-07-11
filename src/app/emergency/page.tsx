"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";
import "./emergencypage.css";

type Props = {};

const EmergencyPage = (props: Props) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    setIsListening(true);
  };

  return (
    <>
      <Navbar />
      <div className="emergency-page flex flex-col items-center p-8  min-h-screen">
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
            onClick={startListening}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-all cursor-pointer"
          >
            {isListening ? "Listening..." : "Start Listening"}
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
