"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import CameraFeed from "./CameraFeed";
import Navbar from "@/components/navbar/Navbar";

const TrackPatientsPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [highPrediction, setHighPrediction] = useState(null);

  useEffect(() => {
    const initTeachableMachine = async () => {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"
      );
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"
      );

      window.init = async () => {
        const URL = "https://teachablemachine.withgoogle.com/models/IMbZYBBnc/";

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        window.model = await tmImage.load(modelURL, metadataURL);
        window.maxPredictions = window.model.getTotalClasses();

        const flip = true;
        window.webcam = new tmImage.Webcam(200, 200, flip);
        await window.webcam.setup();
        await window.webcam.play();

        window.requestAnimationFrame(window.loop);
      };

      window.loop = async () => {
        window.webcam.update();

        const prediction = await window.model.predict(window.webcam.canvas);

        const newPredictions = prediction.map((p) => ({
          className: p.className,
          probability: p.probability.toFixed(2),
        }));
        setPredictions(newPredictions);

        const newHighPrediction = newPredictions.find(
          (p) => parseFloat(p.probability) >= 0.8
        );

        if (newHighPrediction) {
          if (
            !highPrediction ||
            newHighPrediction.className !== highPrediction.className
          ) {
            setHighPrediction(newHighPrediction);
            newHighPrediction.startTime = Date.now();
          } else {
            const duration = Date.now() - newHighPrediction.startTime;
            if (duration >= 3000) {
              setHighPrediction(newHighPrediction);
            }
          }
        } else {
          setHighPrediction(null);
        }

        window.requestAnimationFrame(window.loop);
      };
    };

    initTeachableMachine();
  }, []);

  const loadScript = async (src) => {
    await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const renderPredictions = () => {
    return predictions.map((prediction, index) => (
      <div key={index} className="prediction-bar">
        <div className="prediction-label">{prediction.className}</div>
        <div
          className="prediction-value"
          style={{ width: `${prediction.probability * 100}%` }}
        >
          {`${(prediction.probability * 100).toFixed(2)}%`}
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div>
        <Script strategy="lazyOnload">{/* hehehehehehehe */}</Script>
        <div>
          <CameraFeed />
        </div>
        <div className="text-white font-bold ml-32 text-3xl mt-4">
          Teachable Machine Image Model
        </div>
        <button
          type="button"
          onClick={() => window.init()}
          className="text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer w-32 px-4 py-2 rounded-md ml-32 mt-8"
        >
          Start
        </button>
        <div id="webcam-container"></div>
        <div
          className="prediction-container text-white ml-8 mt-4"
          style={{ fontFamily: "Poppins" }}
        >
          {renderPredictions()}
        </div>
        {highPrediction && (
          <div className="high-prediction text-white ml-8 mt-4 mb-4">
            Surely it's {highPrediction.className}!
          </div>
        )}
      </div>
    </>
  );
};

export default TrackPatientsPage;
