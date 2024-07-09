"use client";
import React, { useState } from "react";
import "./signuppage.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const SignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <>
      <Navbar />
      <div className="signUpPageDiv flex flex-row justify-start items-center">
        <img
          src="/sign_up_poster_bg.png"
          width="60vh"
          style={{ width: "150vh", height: "85vh" }}
          height="80vh"
        />
        <div className="flex flex-col justify-center items-center ml-8">
          <div className="flex flex-row justify-center items-center">
            <h4
              className={`text-2xl text-white mr-2 ${
                isSignUp ? "active" : "hoverable"
              } px-2 py-2 rounded-md cursor-pointer transition-all`}
              onClick={() => setIsSignUp(true)}
              style={{ fontFamily: "Poppins", cursor: "pointer" }}
            >
              Sign Up
            </h4>
            <h4
              className={`text-2xl text-white ${
                !isSignUp ? "active" : "hoverable"
              } px-2 py-2 rounded-md cursor-pointer transition-all`}
              onClick={() => setIsSignUp(false)}
              style={{ fontFamily: "Poppins", cursor: "pointer" }}
            >
              Sign In
            </h4>
          </div>

          <br />
          <input
            type="email"
            placeholder="example@domain.com"
            className="w-72 px-2 py-1 outline-none rounded-sm"
            style={{ fontFamily: "Poppins,sans-serif" }}
          />
          <input
            type="password"
            placeholder="password"
            className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
            style={{ fontFamily: "Poppins,sans-serif" }}
          />
          <input
            type="button"
            value={isSignUp ? "Sign Up" : "Sign In"}
            className="w-40 px-2 py-2 bg-[#991b1b] text-white mt-4 rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
