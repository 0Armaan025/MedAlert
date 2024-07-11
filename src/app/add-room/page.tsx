"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";
import Select from "react-select";

const facultyOptions = [
  { value: "Faculty name", label: "Faculty name" },
  { value: "Faculty name", label: "Faculty name" },
  { value: "Faculty name", label: "Faculty name" },
  { value: "Faculty name", label: "Faculty name" },
];

const ManageRoomScreen = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [input, setInput] = useState({
    roomName: "",
    description: "",
    patients: "wheelchair",
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setInput((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleFacultyChange = (selected: any) => {
    setFacultyMembers(selected);
  };

  return (
    <>
      <Navbar />
      <div className="manageRoomScreenDiv flex flex-col items-center p-4 min-h-screen">
        <center>
          <h4 className="text-3xl font-semibold mb-2 text-white">
            Room Management
          </h4>
          <h5 className="text-xl text-gray-300">Code: 3413223</h5>
        </center>
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mt-6">
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
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#ff1919] text-white font-semibold rounded-md hover:bg-[#ff3737] transition-all"
          >
            Save changes
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ManageRoomScreen;
