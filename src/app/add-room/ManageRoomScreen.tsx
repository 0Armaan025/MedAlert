"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { db } from "@/firebase/clientApp";
import Select from "react-select";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const ManageRoomScreen = () => {
  const [input, setInput] = useState({
    roomName: "",
    capacity: 0,
    description: "",
    patients: "wheelchair",
  });
  const [hospitalCode, setHospitalCode] = useState("");
  const router = useRouter();
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [facultyOptions, setFacultyOptions] = useState([]);

  useEffect(() => {
    const code = Cookies.get("hospitalCode");

    const fetchFacultyMembers = async () => {
      if (hospitalCode) {
        const q = query(
          collection(db, "hospitalStaff"),
          where("hospitalID", "==", hospitalCode)
        );
        const querySnapshot = await getDocs(q);
        const options = querySnapshot.docs.map((doc) => ({
          value: doc.data().email,
          label: doc.data().email,
        }));
        setFacultyOptions(options as any);
      }
    };

    if (!code) {
      router.push("/error");
    } else {
      setHospitalCode(code);
    }
    fetchFacultyMembers();
  }, [router]);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setInput((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleFacultyChange = (selected: any) => {
    setFacultyMembers(selected);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const roomData = {
        ...input,
        hospitalCode,
        facultyMembers: facultyMembers.map((member: any) => member.value),
      };

      await setDoc(doc(db, "hospitals", hospitalCode), { rooms: true });

      alert("Room added successfully!");
    } catch (error) {
      console.error("Error adding room: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="manageRoomScreenDiv flex flex-col items-center p-4 min-h-screen">
        <center>
          <h4 className="text-3xl font-semibold mb-2 text-white">
            Room Management
          </h4>
          <h5 className="text-xl text-gray-300">Code: {hospitalCode}</h5>
        </center>
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mt-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="roomName"
            >
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={input.roomName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter room name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="capacity"
            >
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              value={input.capacity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter total capacity"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={input.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter room description"
              required
            />
          </div>
          <div className="mb-4 w-full max-w-md">
            <label className="block text-gray-700 font-semibold mb-2">
              Faculty Members
            </label>
            <Select
              isMulti
              options={facultyOptions as any}
              value={facultyMembers}
              onChange={handleFacultyChange}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="patients"
            >
              Patients Who Can Come
            </label>
            <select
              id="patients"
              value={input.patients}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="wheelchair">Wheelchair People</option>
              <option value="stretcher">People Brought by Stretcher</option>
              <option value="surgery">People Who Want Surgery</option>
              <option value="physical">People with Physical Issues</option>
              <option value="normal">
                Normal Cold/Fever/Other Problems People
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#ff1919] hover:bg-[#ff3737] text-white font-semibold rounded-md transition-all"
          >
            Save changes
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
