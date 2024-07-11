import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

type Props = {};

const SendAlertPage = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="sendAlertPageDiv">
        <center>
          <h3
            style={{ fontFamily: "Poppins,sans-serif" }}
            className="text-3xl text-white font-semibold"
          >
            {" "}
            Send an alert!{" "}
          </h3>
          <br />

          <div className="bg-white rounded-sm p-4 h-96 w-[25rem] flex flex-col justify-start items-center">
            <input
              type="text"
              className="outline-none border-2 border-black rounded-md px-4 py-2 w-full"
              placeholder="Alert title"
              style={{ fontFamily: "Poppins,sans-serif" }}
            />
            <select className="outline-none border-2 border-black rounded-md px-4 py-2 w-full mt-4">
              <option value="incoming"> Incoming </option>
              <option value="critical"> Critical </option>
              <option value="feedback"> Feedback </option>
            </select>
            <textarea
              className="outline-none border-2 border-black rounded-md px-4 py-2 w-full h-52 mt-4"
              placeholder="Message"
            ></textarea>
            <br />
            <input
              type="button"
              className="px-4 py-2 w-40 h-12 cursor-pointer bg-[#991b1b] hover:bg-[#d72e2e] transition-all text-white rounded-md"
              value="Send!"
            />
          </div>
        </center>
      </div>
      <Footer />
    </>
  );
};

export default SendAlertPage;
