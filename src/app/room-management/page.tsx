"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const initialRooms = [
  {
    id: 1,
    name: "Room 1",
    capacity: 2,
    patients: [
      { name: "John Doe", problem: "emergency", priority: 1 },
      { name: "Jane Doe", problem: "urgent", priority: 2 },
    ],
  },
  { id: 2, name: "Room 2", capacity: 2, patients: [] },
];

const RoomManagement = () => {
  const [rooms, setRooms] = useState(initialRooms);

  const removePatient = (roomId: any, patientIndex: any) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        const updatedPatients = room.patients.filter(
          (_, index) => index !== patientIndex
        );
        return { ...room, patients: updatedPatients };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-4 min-h-screen ">
        <h2 className="text-2xl font-bold mb-4 text-white">Room Management</h2>
        <div className="w-full max-w-4xl">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white p-6 mb-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <ul>
                {room.patients.map((patient, index) => (
                  <li
                    key={index}
                    className="mb-2 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold">{patient.name}</div>
                      <div>Problem: {patient.problem}</div>
                      <div>Priority: {patient.priority}</div>
                    </div>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all"
                      onClick={() => removePatient(room.id, index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              {room.patients.length === 0 && <div>No patients assigned</div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomManagement;
