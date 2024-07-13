"use client";
import React, { useState } from "react";
import "./signuppage.css";
import Navbar from "@/components/navbar/Navbar";
import Cookies from "js-cookie";

import Footer from "@/components/footer/Footer";
import { auth, db } from "../../firebase/clientApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const SignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [individualType, setIndividualType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalID, setHospitalID] = useState("");
  const [role, setRole] = useState("");

  const handleSignUpContinue = () => {
    if (isSignUp) {
      setStep(2);
    } else {
      signIn();
    }
  };

  const generateHospitalCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
    } else if (individualType === "normalIndividual") {
      signUpNormalIndividual();
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { userType } = docSnap.data();
        Cookies.set("userUid", user.uid);
        Cookies.set("userType", userType);
        alert("Sign-in successful");
      } else {
        alert("No such user found");
      }
    } catch (error: any) {
      console.error("Error signing in: ", error);
      alert("Error signing in: " + error.message);
    }
  };

  const signUpNormalIndividual = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        userType: "normalIndividual",
      });

      Cookies.set("userUid", user.uid);
      Cookies.set("userType", "normalIndividual");

      alert("Sign-up as a normal individual completed");
    } catch (error: any) {
      console.error("Error signing up: ", error);
      alert("Error signing up: " + error.message);
    }
  };

  const signUpHospital = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const hospitalCode = generateHospitalCode();

      await setDoc(doc(db, "hospitals", user.uid), {
        email,
        hospitalName,
        hospitalAddress,
        hospitalCode,
        userType: "hospital",
      });

      Cookies.set("userUid", user.uid);
      Cookies.set("userType", "hospital");
      Cookies.set("hospitalCode", hospitalCode);

      alert(
        `Hospital sign-up completed. Your hospital code is: ${hospitalCode}`
      );
    } catch (error: any) {
      console.error("Error signing up: ", error);
      alert("Error signing up: " + error.message);
    }
  };

  const signUpHospitalStaff = async () => {
    try {
      const q = query(
        collection(db, "hospitals"),
        where("hospitalCode", "==", hospitalID)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Invalid hospital code");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "hospitalStaff", user.uid), {
        email,
        hospitalID,
        role,
        userType: "hospitalStaff",
      });

      Cookies.set("userUid", user.uid);
      Cookies.set("userType", "hospitalStaff");
      Cookies.set("hospitalCode", hospitalID);

      alert("Hospital staff sign-up completed");
    } catch (error: any) {
      console.error("Error signing up: ", error);
      alert("Error signing up: " + error.message);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Hospital Address"
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
                value={hospitalAddress}
                onChange={(e) => setHospitalAddress(e.target.value)}
              />
              <input
                type="button"
                value="Continue"
                className="w-40 px-2 py-2 bg-[#991b1b] text-white mt-4 rounded-md shadow-md shadow-black cursor-pointer hover:bg-[#c52d2d] transition-all"
                onClick={signUpHospital}
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
                placeholder="Hospital Code"
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
                value={hospitalID}
                onChange={(e) => setHospitalID(e.target.value)}
              />
              <select
                className="w-72 px-2 py-1 outline-none rounded-sm mt-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
                onClick={signUpHospitalStaff}
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
