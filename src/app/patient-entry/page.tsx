"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { db } from "@/firebase/clientApp";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import Cookies from "js-cookie";

const PatientEntry = () => {
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);

  const hospitalCode = Cookies.get("hospitalCode");

  useEffect(() => {
    const fetchRooms = async () => {
      if (!hospitalCode) return;

      const q = query(
        collection(db, "rooms"),
        where("hospitalCode", "==", hospitalCode)
      );
      const querySnapshot = await getDocs(q);
      const fetchedRooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        capacity: parseInt(doc.data().capacity, 10),
      }));
      setRooms(fetchedRooms as any);
    };

    fetchRooms();
  }, [hospitalCode]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { name, problem } = event.target.elements;

    const newPatient = {
      name: name.value,
      problem: problem.value,
      priority: getPriority(problem.value),
      date: Timestamp.now(),
    };

    const assignedRoom = assignRoom(newPatient) as any;

    if (assignedRoom) {
      const roomDocRef = doc(db, "rooms", assignedRoom.id);
      const roomPatients = assignedRoom.patientsArray || [];
      const updatedPatientsList = [...roomPatients, newPatient];

      try {
        await updateDoc(roomDocRef, { patientsArray: updatedPatientsList });

        await addDoc(collection(db, "patients"), newPatient);

        setRooms((prevRooms: any) =>
          prevRooms.map((room: any) =>
            room.id === assignedRoom.id
              ? { ...room, patientsArray: updatedPatientsList }
              : room
          )
        );
        setPatients((prevPatients) => [...prevPatients, newPatient] as any);
        alert("Patient added successfully!");
      } catch (error) {
        console.error("Error adding patient: ", error);
        alert("Failed to add patient to the database.");
      }
    } else {
      alert("No available rooms");
    }
  };

  const getPriority = (problem: any) => {
    const priorityMap = {
      emergency: 1,
      urgent: 2,
      "non-urgent": 3,
    } as any;
    return priorityMap[problem.toLowerCase()] || 3;
  };

  const assignRoom = (patient: any) => {
    const availableRooms = rooms.filter(
      (room: any) => (room.patientsArray?.length || 0) < room.capacity
    );
    if (availableRooms.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableRooms.length);
      return availableRooms[randomIndex];
    }
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-4 min-h-screen">
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
            className="w-full py-2 bg-[#ff1919] hover:bg-[#ff3737] text-white font-semibold rounded-md"
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
