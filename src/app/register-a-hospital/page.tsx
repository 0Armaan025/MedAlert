"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";

const RegisterAHospitalPage = () => {
  const [step, setStep] = useState(1); // Step 1: Choose to register hospital or join as staff
  const [role, setRole] = useState(""); // "register" or "join"

  const handleRoleSelection = (selectedRole: any) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleRegisterContinue = () => {
    alert("Hospital registration completed");
  };

  const handleJoinContinue = () => {
    alert("Joined as a hospital staff");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        {step === 1 && (
          <>
            <h4
              className="text-2xl text-white"
              style={{ fontFamily: "Poppins" }}
            >
              Would you like to register a hospital or join as a staff member?
            </h4>
            <div className="flex flex-row mt-4">
              <button
                className="w-40 px-2 py-2 bg-[#991b1b] text-white mr-4 rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                onClick={() => handleRoleSelection("register")}
              >
                Register a Hospital
              </button>
              <button
                className="w-40 px-2 py-2 bg-[#991b1b] text-white rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                onClick={() => handleRoleSelection("join")}
              >
                Join as Staff
              </button>
            </div>
          </>
        )}

        {step === 2 && role === "register" && (
          <div className="flex flex-col justify-center items-center mt-4">
            <h4 className="text-2xl text-white">Register a Hospital</h4>
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
              onClick={handleRegisterContinue}
            />
          </div>
        )}

        {step === 2 && role === "join" && (
          <div className="flex flex-col justify-center items-center mt-4">
            <h4 className="text-2xl text-white">Join as a Staff Member</h4>
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
              onClick={handleJoinContinue}
            />
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default RegisterAHospitalPage;
