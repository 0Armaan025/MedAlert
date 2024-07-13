"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { db } from "@/firebase/clientApp";
import Select from "react-select";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const AddRoomScreen = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [input, setInput] = useState({
    roomName: "",
    capacity: 0,
    description: "",
    patients: "wheelchair",
  });
  const [hospitalCode, setHospitalCode] = useState("");

  useEffect(() => {
    const code = Cookies.get("hospitalCode");
    if (!code) {
      alert("Please go back to the authentication page and re-register.");
    } else {
      setHospitalCode(code);
      fetchFacultyMembers(code); // Fetch faculty members on hospitalCode change
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setInput((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleFacultyChange = (selected: any) => {
    setFacultyMembers(selected);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const roomData = {
        ...input,
        hospitalCode,
        facultyMembers: facultyMembers.map((member: any) => member.value),
      };

      await setDoc(doc(db, "rooms", input.roomName), roomData);

      alert("Room added successfully!");
    } catch (error) {
      console.error("Error adding room: ", error);
    }
  };

  const fetchFacultyMembers = async (code: string) => {
    try {
      const q = query(
        collection(db, "hospitalStaff"),
        where("hospitalID", "==", code)
      );
      const querySnapshot = await getDocs(q);
      const options = querySnapshot.docs.map((doc) => ({
        value: doc.data().email,
        label: doc.data().email,
      }));
      setFacultyMembers(options as any);
    } catch (error) {
      console.error("Error fetching faculty members: ", error);
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
              options={facultyMembers}
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

export default AddRoomScreen;
