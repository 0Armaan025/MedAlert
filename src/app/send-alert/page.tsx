"use client";
import React, { useState } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { db } from "@/firebase/clientApp";
import { collection, addDoc } from "firebase/firestore";
import Cookies from "js-cookie";

const SendAlertPage = () => {
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
          <h3 className="text-3xl text-white font-semibold mb-4 ">
            Send an alert!
          </h3>
          <div className="bg-white rounded-sm p-4 w-full md:w-[25rem] max-w-screen-md flex flex-col items-center">
            <input
              type="text"
              className="inputField p-2  w-72 outline-none border-2 border-black rounded-md"
              placeholder="Alert title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="inputField mt-4 p-1 w-72 outline-none border-2 border-black rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="incoming">Incoming</option>
              <option value="critical">Critical</option>
              <option value="predicted">Predicted</option>
            </select>
            <textarea
              className="inputField h-52 mt-4  w-72 p-4 outline-none border-2 border-black rounded-md"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              className="sendButton bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer transition-all px-4 py-2 w-40 mt-4"
              onClick={handleSubmit}
            >
              Send!
            </button>
          </div>
        </center>
      </div>
      <Footer />
    </>
  );
};

export default SendAlertPage;
