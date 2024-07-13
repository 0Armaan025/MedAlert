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
        where("hospitalID", "==", hospitalCode)
      );
      const querySnapshot = await getDocs(q);
      const fetchedRooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        capacity: parseInt(doc.data().capacity),
      }));
      setRooms(fetchedRooms);
    };

    fetchRooms();
  }, [hospitalCode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, problem } = event.target.elements;

    const newPatient = {
      name: name.value,
      problem: problem.value,
      priority: getPriority(problem.value),
      date: Timestamp.now(),
    };
    const assignedRoom = assignRoom(newPatient);

    if (assignedRoom) {
      const updatedPatientsList = [...assignedRoom.patients, newPatient.name];

      try {
        // Update room's patient list in Firestore
        const roomDocRef = doc(db, "rooms", assignedRoom.id);
        await updateDoc(roomDocRef, { patients: updatedPatientsList });

        // Add patient to Firestore
        await addDoc(collection(db, "patients"), newPatient);

        setRooms((prevRooms:any) =>
          prevRooms.map((room) =>
            room.id === assignedRoom.id
              ? { ...room, patients: updatedPatientsList }
              : room
          )
        );
        setPatients((prevPatients) => [...prevPatients, newPatient]);
        alert("Patient added successfully!");
      } catch (error) {
        console.error("Error adding patient: ", error);
        alert("Failed to add patient to the database.");
      }
    } else {
      alert("No available rooms");
    }
  };

  const getPriority = (problem) => {
    const priorityMap = {
      emergency: 1,
      urgent: 2,
      "non-urgent": 3,
    };
    return priorityMap[problem.toLowerCase()] || 3;
  };

  const assignRoom = (patient) => {
    const availableRooms = rooms.filter(
      (room) =>
        room.patients.length < room.capacity &&
        (room.patientsType === "normal" ||
          room.patientsType === "physical")
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
