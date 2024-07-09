"use client";
import React, { useState } from "react";
import "./signuppage.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const SignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [individualType, setIndividualType] = useState("");

  const handleSignUpContinue = () => {
    if (isSignUp) {
      setStep(2);
    }
  };

  const handleUserTypeContinue = () => {
    if (userType === "hospital") {
      setStep(3);
    } else if (userType === "individual") {
      setStep(4);
    }
  };

  const handleIndividualTypeContinue = () => {
    if (individualType === "hospitalStaff") {
      setStep(5);
    } else {
      // Handle normal individual sign-up
      alert("Sign-up as a normal individual completed");
    }
  };

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
          {step === 1 && (
            <>
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
                onClick={handleSignUpContinue}
              />
            </>
          )}

          {step === 2 && (
            <div className="flex flex-col justify-center items-center">
              <h4
                className="text-2xl text-white"
                style={{ fontFamily: "Poppins" }}
              >
                Are you signing up as a hospital or an individual?
              </h4>
              <div className="flex flex-row mt-4">
                <button
                  className="w-40 px-2 py-2 bg-[#991b1b] text-white mr-4 rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                  onClick={() => {
                    setUserType("hospital");
                    handleUserTypeContinue();
                  }}
                >
                  Hospital
                </button>
                <button
                  className="w-40 px-2 py-2 bg-[#991b1b] text-white rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                  onClick={() => {
                    setUserType("individual");
                    handleUserTypeContinue();
                  }}
                >
                  Individual
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col justify-center items-center">
              <h4
                className="text-2xl text-white"
                style={{ fontFamily: "Poppins" }}
              >
                Hospital Details
              </h4>
              <input
                type="text"
                placeholder="Hospital Name"
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
              />
              <input
                type="text"
                placeholder="Hospital Address"
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
              />
              <input
                type="button"
                value="Continue"
                className="w-40 px-2 py-2 bg-[#991b1b] text-white mt-4 rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                onClick={() => alert("Hospital sign-up completed")}
              />
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col justify-center items-center">
              <h4
                className="text-2xl text-white"
                style={{ fontFamily: "Poppins" }}
              >
                Are you a hospital staff or a normal individual?
              </h4>
              <div className="flex flex-row mt-4">
                <button
                  className="w-40 px-2 py-2 bg-[#991b1b] text-white mr-4 rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                  onClick={() => {
                    setIndividualType("hospitalStaff");
                    handleIndividualTypeContinue();
                  }}
                >
                  Hospital Staff
                </button>
                <button
                  className="w-40 px-2 py-2 bg-[#991b1b] text-white rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                  onClick={() => {
                    setIndividualType("normalIndividual");
                    handleIndividualTypeContinue();
                  }}
                >
                  Normal Individual
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col justify-center items-center">
              <h4
                className="text-2xl text-white"
                style={{ fontFamily: "Poppins" }}
              >
                Hospital Staff Details
              </h4>
              <input
                type="text"
                placeholder="Hospital ID"
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
              />
              <select
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                <option value="" disabled selected>
                  Select your role
                </option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Admin</option>
                <option value="other">Other</option>
              </select>
              <input
                type="button"
                value="Continue"
                className="w-40 px-2 py-2 bg-[#991b1b] text-white mt-4 rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                onClick={() => alert("Hospital staff sign-up completed")}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
