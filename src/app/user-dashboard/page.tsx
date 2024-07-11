"use client";
import UserDashboardLeftSideBar from "@/components/dashboard-left-side-bar/UserDashboardLeftSideBar";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";

const UserDashboardPage = () => {
  const [userData, setUserData] = useState({
    weight: "",
    height: "",
    diseases: "",
    symptoms: "",
    age: "",
    bloodPressure: "",
    heartRate: "",
    medications: "",
    allergies: "",
    familyHistory: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("User Data: ", userData);
  };

  return (
    <>
      <Navbar />
      <div className="userDashboardPage flex flex-row justify-start items-start">
        <UserDashboardLeftSideBar />
        <div className="flex flex-col items-center p-4 min-h-screen w-full">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            User Health Data
          </h2>
          <form
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="weight"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={userData.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter weight"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="height"
              >
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                value={userData.height}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter height"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                value={userData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter age"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="bloodPressure"
              >
                Blood Pressure
              </label>
              <input
                type="text"
                id="bloodPressure"
                value={userData.bloodPressure}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter blood pressure"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="heartRate"
              >
                Heart Rate
              </label>
              <input
                type="number"
                id="heartRate"
                value={userData.heartRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter heart rate"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="diseases"
              >
                Past Diseases
              </label>
              <textarea
                id="diseases"
                value={userData.diseases}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter past diseases"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="symptoms"
              >
                Current Symptoms
              </label>
              <textarea
                id="symptoms"
                value={userData.symptoms}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter current symptoms"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="medications"
              >
                Current Medications
              </label>
              <textarea
                id="medications"
                value={userData.medications}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter current medications"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="allergies"
              >
                Allergies
              </label>
              <textarea
                id="allergies"
                value={userData.allergies}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter allergies"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="familyHistory"
              >
                Family Medical History
              </label>
              <textarea
                id="familyHistory"
                value={userData.familyHistory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter family medical history"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#ff1919] text-white font-semibold rounded-md hover:bg-[#ff3737] transition-all"
            >
              Save Data
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboardPage;
