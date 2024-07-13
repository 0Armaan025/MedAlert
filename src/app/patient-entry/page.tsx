"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const PatientEntry = () => {
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([
    { id: 1, name: "Room 1", capacity: 2, patients: [] },
    { id: 2, name: "Room 2", capacity: 2, patients: [] },
  ]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { name, problem } = event.target.elements;

    const newPatient = {
      name: name.value,
      problem: problem.value,
      priority: getPriority(problem.value),
    };
    const assignedRoom = assignRoom(newPatient);

    if (assignedRoom) {
      assignedRoom.patients.push(newPatient as never);
      setRooms([...rooms]);
      setPatients([...patients, newPatient] as never);
    } else {
      alert("No available rooms");
    }
  };

  const getPriority = (problem: string) => {
    const priorityMap: { [key: string]: number } = {
      emergency: 1,
      urgent: 2,
      "non-urgent": 3,
    };
    return priorityMap[problem.toLowerCase()] || 3;
  };

  const assignRoom = (patient: any) => {
    const availableRooms = rooms.filter(
      (room) => room.patients.length < room.capacity
    );
    if (availableRooms.length > 0) {
      availableRooms.sort((a, b) => a.patients.length - b.patients.length);
      return availableRooms[0];
    }
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-4 min-h-screen ">
        <h2 className="text-2xl font-bold mb-4 text-white">Patient Entry</h2>
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Patient Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="problem"
            >
              Problem
            </label>
            <select
              id="problem"
              name="problem"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="emergency">Emergency</option>
              <option value="urgent">Urgent</option>
              <option value="non-urgent">Non-Urgent</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#ff1919] hover:bg-[#ff3737] text-white font-semibold rounded-md "
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PatientEntry;
