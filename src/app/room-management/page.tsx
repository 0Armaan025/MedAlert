"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { db } from "@/firebase/clientApp";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Cookies from "js-cookie";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const hospitalCode = Cookies.get("hospitalCode");

  useEffect(() => {
    const fetchRooms = async () => {
      if (!hospitalCode) return;

      const roomCollection = collection(db, "rooms");
      const roomSnapshot = await getDocs(roomCollection);
      const roomList = roomSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((room: any) => room.hospitalCode === hospitalCode)
        .map((room: any) => ({
          ...room,
          capacity: parseInt(room.capacity),
          patientsArray: room.patientsArray || [],
          name: room.id,
        }));

      setRooms(roomList as any);
    };

    fetchRooms();
  }, [hospitalCode]);

  const removePatient = async (roomId: string, patientIndex: number) => {
    const updatedRooms = rooms.map((room: any) => {
      if (room.id === roomId) {
        const updatedPatients = room.patientsArray.filter(
          (_: any, index: number) => index !== patientIndex
        );
        return { ...room, patientsArray: updatedPatients };
      }
      return room;
    });

    setRooms(updatedRooms as any);

    const roomDocRef = doc(db, "rooms", roomId);
    await updateDoc(roomDocRef, {
      patientsArray: updatedRooms.find((room) => room.id === roomId)
        .patientsArray,
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-6 min-h-screen">
        <h2
          className="text-3xl font-bold mb-6 text-white "
          style={{ fontFamily: "Poppins" }}
        >
          Room Management
        </h2>
        <div className="w-full max-w-5xl space-y-6">
          {rooms.map((room: any) => (
            <div key={room.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {room.name}
              </h3>
              <ul>
                {room.patientsArray.map((patient: any, index: number) => (
                  <li
                    key={index}
                    className="mb-4 p-4 bg-gray-200  rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <div className="text-lg font-semibold text-gray-700">
                        {patient.name}
                      </div>
                      <div className="text-gray-600">
                        Problem: {patient.problem}
                      </div>
                      <div className="text-gray-600">
                        Priority: {patient.priority}
                      </div>
                    </div>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all"
                      onClick={() => removePatient(room.id, index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              {room.patientsArray.length === 0 && (
                <div className="text-gray-600">No patients assigned</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomManagement;
