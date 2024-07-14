"use client";
import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import CameraFeed from "./CameraFeed";
import Navbar from "@/components/navbar/Navbar";
import { db } from "@/firebase/clientApp";

import {
  collection,
  setDoc,
  doc,
  Timestamp,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Cookies from "js-cookie";

const TrackPatientsPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [predictionBuffer, setPredictionBuffer] = useState([]);
  const [showNoRoomWarning, setShowNoRoomWarning] = useState(false); // State to manage showing no room warning
  const isSendingAlert = useRef(false);
  const bufferLimit = 10;

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
          probability: parseFloat(p.probability.toFixed(2)),
        }));
        setPredictions(newPredictions);

        setPredictionBuffer((prevBuffer) => {
          const updatedBuffer = [...prevBuffer, newPredictions];
          if (updatedBuffer.length >= bufferLimit) {
            analyzePredictions(updatedBuffer);
            return [];
          }
          return updatedBuffer;
        });

        window.requestAnimationFrame(window.loop);
      };
    };

    const loadScript = async (src) => {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const analyzePredictions = async (buffer) => {
      const predictionCounts = {};
      buffer.forEach((predictions) => {
        predictions.forEach((prediction) => {
          if (prediction.probability >= 0.8) {
            if (!predictionCounts[prediction.className]) {
              predictionCounts[prediction.className] = 0;
            }
            predictionCounts[prediction.className]++;
          }
        });
      });

      for (const [className, count] of Object.entries(predictionCounts)) {
        if (count >= bufferLimit / 2 && !isSendingAlert.current) {
          console.log("Consistent high prediction:", className);
          isSendingAlert.current = true;
          sendAlert({ className, probability: 0.8 });
          break;
        }
      }
    };

    const sendAlert = async (highPrediction) => {
      const hospitalCode = Cookies.get("hospitalCode");
      const now = new Date();
      const dateString = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const alertData = {
        date: dateString,
        hospitalCode: hospitalCode,
        message: `Emergency, person on a ${highPrediction.className} approaching room`,
        title: `Emergency! Patient on a ${highPrediction.className} approaching room`,
        type: "critical",
      };

      try {
        await setDoc(doc(db, "alerts", Date.now().toString()), alertData);
        const availableRoom = await checkRoomAvailability(
          highPrediction.className
        );
        if (availableRoom) {
          console.log(`Room available for ${highPrediction.className}`);
        } else {
          console.log(`No room available for ${highPrediction.className}`);
          setShowNoRoomWarning(true); // Show warning message
          await setDoc(doc(db, "alerts", Date.now().toString()), {
            date: dateString,
            hospitalCode: hospitalCode,
            message: `Critical! No room available for ${highPrediction.className}`,
            title: `No Room Available! Critical Situation`,
            type: "critical",
          });
        }
        console.log("Alert sent to Firestore");
        alert("Alert sent to Firestore");
      } catch (error) {
        console.error("Error sending alert to Firestore:", error);
      } finally {
        isSendingAlert.current = false; // Reset sending alert flag after sending
      }
    };

    const checkRoomAvailability = async (className) => {
      const hospitalCode = Cookies.get("hospitalCode");
      const roomsRef = collection(db, "rooms");
      const q = query(roomsRef, where("hospitalCode", "==", hospitalCode));
      const querySnapshot = await getDocs(q);
      let availableRoom = false;

      querySnapshot.forEach(async (doc) => {
        const roomData = doc.data();
        if (roomData.patientsArray) {
          roomData.patientsArray.push({
            id: Math.random().toString(36).substring(7),
            problem: className,
            name: "No name - Patient scanned by the cam.",
            date: Timestamp.now(),
            priority: 1,
          });
          await updateDoc(doc.ref, { patientsArray: roomData.patientsArray });
          availableRoom = true;
        } else {
          const now = new Date();
          const firestoreTimestamp = Timestamp.fromDate(now);
          const newPatientsArray = [
            {
              id: Math.random().toString(36).substring(7),
              problem: className,
              name: "No name - Patient scanned by the cam.",
              date: firestoreTimestamp,
              priority: 1,
            },
          ];
          await updateDoc(doc.ref, { patientsArray: newPatientsArray });
          availableRoom = true;
        }
      });
      return availableRoom;
    };

    initTeachableMachine();
  }, []);

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
        {showNoRoomWarning && (
          <div className="text-red-500 ml-32 mt-4 text-4xl">
            No room available - WARNING!
          </div>
        )}
        <div id="webcam-container"></div>
        <div
          className="prediction-container text-white ml-8 mt-4"
          style={{ fontFamily: "Poppins" }}
        >
          {renderPredictions()}
        </div>
      </div>
    </>
  );
};

export default TrackPatientsPage;
