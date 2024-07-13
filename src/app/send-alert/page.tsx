"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";
import { db } from "@/firebase/clientApp";
import { collection, addDoc } from "firebase/firestore";
import Cookies from "js-cookie";

const SendAlertPage = () => {
  // if it's a person on any of these, send an automated alert, and get them a room

  const [title, setTitle] = useState("");
  const [type, setType] = useState("incoming");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const hospitalCode = Cookies.get("hospitalCode");
    if (!hospitalCode) {
      alert("Hospital code not found in cookies");
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
      2,
      "0"
    )} ${currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;

    try {
      await addDoc(collection(db, "alerts"), {
        title,
        type,
        message,
        hospitalCode,
        date: formattedDate,
      });
      alert("Alert sent successfully");
      setTitle("");
      setType("incoming");
      setMessage("");
    } catch (error) {
      console.error("Error sending alert: ", error);
      alert("Error sending alert");
    }
  };

  return (
    <>
      <Navbar />
      <div className="sendAlertPageDiv">
        <center>
          <h3
            style={{ fontFamily: "Poppins,sans-serif" }}
            className="text-3xl text-white font-semibold"
          >
            Send an alert!
          </h3>
          <br />
          <div className="bg-white rounded-sm p-4 h-96 w-[25rem] flex flex-col justify-start items-center">
            <input
              type="text"
              className="outline-none border-2 border-black rounded-md px-4 py-2 w-full"
              placeholder="Alert title"
              style={{ fontFamily: "Poppins,sans-serif" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="outline-none border-2 border-black rounded-md px-4 py-2 w-full mt-4"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="incoming">Incoming</option>
              <option value="critical">Critical</option>
              <option value="predicted">Predicted</option>
            </select>
            <textarea
              className="outline-none border-2 border-black rounded-md px-4 py-2 w-full h-52 mt-4"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <br />
            <input
              type="button"
              className="px-4 py-2 w-40 h-12 cursor-pointer bg-[#991b1b] hover:bg-[#d72e2e] transition-all text-white rounded-md"
              value="Send!"
              onClick={handleSubmit}
            />
          </div>
        </center>
      </div>
      <Footer />
    </>
  );
};

export default SendAlertPage;
