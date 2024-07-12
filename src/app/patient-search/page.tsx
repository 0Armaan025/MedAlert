"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

type Patient = {
  name: string;
  hospital: string;
  room: string;
  cause: string;
  date: string;
};

const dummyData: Patient[] = [
  {
    name: "John Doe",
    hospital: "City Hospital",
    room: "Room 101",
    cause: "Checkup",
    date: "2024-07-15",
  },
  {
    name: "Jane Smith",
    hospital: "County General",
    room: "Room 202",
    cause: "Surgery",
    date: "2024-07-10",
  },
];

const PatientSearchPage = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [results, setResults] = useState<Patient[]>([]);

  const handleSearch = () => {
    const filteredResults = dummyData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase()) &&
        (!selectedDate || item.date === selectedDate)
    );
    setResults(filteredResults);
  };

  const getStatus = (date: string) => {
    const today = new Date();
    const appointmentDate = new Date(date);
    if (appointmentDate > today) return "Upcoming";
    if (appointmentDate.toDateString() === today.toDateString())
      return "Ongoing";
    return "Ended";
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-8 min-h-screen ">
        <h2 className="text-4xl font-extrabold text-gray-300 mb-6">
          Patient Search
        </h2>
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="searchName"
            >
              Patient Name
            </label>
            <input
              type="text"
              id="searchName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter patient name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="selectedDate"
            >
              Appointment Date
            </label>
            <select
              id="selectedDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">All Dates</option>
              {dummyData.map((item, index) => (
                <option key={index} value={item.date}>
                  {item.date}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="w-full max-w-3xl">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white p-6 mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {result.name}
              </h3>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Hospital:</span>{" "}
                {result.hospital}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Room:</span> {result.room}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Cause:</span> {result.cause}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Date:</span> {result.date}
              </div>
              <div
                className={`text-white px-3 py-1 rounded-md inline-block ${
                  getStatus(result.date) === "Upcoming"
                    ? "bg-green-500"
                    : getStatus(result.date) === "Ongoing"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                Status: {getStatus(result.date)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientSearchPage;
