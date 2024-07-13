"use client";
import React, { useRef, useEffect, useState } from "react";
import { createCanvas } from "canvas";
import TeachableMachine from "@sashido/teachablemachine-node"; // Note: This library is for Node.js environment

type ClassPrediction = {
  className: string;
  probability: number;
};

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/IMbZYBBnc/",
});

const IndexPage = () => {
  const [predictions, setPredictions] = useState<ClassPrediction[]>([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await model.load();
        setModelLoaded(true);
        console.log("Model loaded successfully.");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadModel();
  }, []);

  const captureImageAndPredict = async () => {
    alert("Capture button clicked");
    alert("VideoRef:" + videoRef.current);
    alert("Model loaded:" + modelLoaded);

    if (!videoRef.current || !modelLoaded) {
      console.log("Video or model not loaded");
      return;
    }

    const canvas = createCanvas(
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );
    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current as any, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/jpeg");

    try {
      const predictions = await model.classify({
        image: imageDataUrl,
      });

      setPredictions(predictions);
    } catch (error) {
      console.error("Error predicting image:", error);
    }
  };

  const startCamera = async () => {
    const constraints = {
      video: true,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  useEffect(() => {
    startCamera(); // Start the camera when component mounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Camera Feed with Predictions</h1>
      <div className="camera-feed">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
      <div>
        <button onClick={captureImageAndPredict} className="text-white">
          Capture Image and Predict
        </button>
      </div>
      <div>
        <h2 className="text-white">Predictions:</h2>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>
              <strong>{prediction.className}</strong>:{" "}
              {prediction.probability.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
