"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "@/firebase/clientApp";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

type Patient = {
  name: string;
  hospital: string;
  room: string;
  cause: string;
  date: Timestamp;
};

const PatientSearchPage = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [results, setResults] = useState<Patient[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const q = query(collection(db, "patients"));
      const querySnapshot = await getDocs(q);
      const fetchedPatients: Patient[] = querySnapshot.docs.map(
        (doc) => doc.data() as Patient
      );

      setPatients(fetchedPatients);
    };

    fetchPatients();
  }, []);

  const handleSearch = () => {
    const filteredResults = patients.filter((item) => {
      const itemDate = item.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
      const searchDateMatch =
        !selectedDate ||
        (itemDate.getFullYear() === selectedDate.getFullYear() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getDate() === selectedDate.getDate());

      return (
        item.name.toLowerCase().includes(searchName.toLowerCase()) &&
        searchDateMatch
      );
    });
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
        <h2 className="text-4xl font-extrabold text-white mb-6">
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
            <DatePicker
              id="selectedDate"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <button
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all"
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
