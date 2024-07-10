"use client";
import React, { useState } from "react";
import Select from "react-select";
import "./addroompage.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

type FacultyMember = {
  label: string;
  value: string;
};

const facultyOptions: FacultyMember[] = [
  { label: "Dr. John Doe", value: "john_doe" },
  { label: "Dr. Jane Smith", value: "jane_smith" },
  { label: "Dr. Alice Johnson", value: "alice_johnson" },
  { label: "Dr. Bob Brown", value: "bob_brown" },
];

const AddRoomPage: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [description, setDescription] = useState("");
  const [patientCapacity, setPatientCapacity] = useState<number>(0);

  const handleAddRoom = () => {
    const roomData = {
      roomName,
      facultyMembers,
      description,
      patientCapacity,
    };
    console.log("Room data: ", roomData);
    // Add your room creation logic here
  };

  return (
    <>
      <Navbar />{" "}
      <div className="add-room-page flex flex-col items-center p-8">
        <h2
          className="text-2xl font-bold mb-6 text-white"
          style={{ fontFamily: "Poppins" }}
        >
          Add Hospital Room
        </h2>

        <div className="mb-4 w-full max-w-md">
          <label className="block text-gray-200">Room Name</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4 w-full max-w-md">
          <label className="block text-gray-200">Faculty Members</label>
          <Select
            isMulti
            options={facultyOptions}
            value={facultyMembers}
            onChange={(selected: any) =>
              setFacultyMembers(selected as FacultyMember[])
            }
            className="mt-1"
          />
        </div>

        <div className="mb-4 w-full max-w-md">
          <label className="block text-gray-200">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            rows={4}
          />
        </div>

        <div className="mb-6 w-full max-w-md">
          <label className="block text-gray-200">
            Number of Patients that can be treated simulteaneously:
          </label>
          <input
            type="number"
            value={patientCapacity}
            onChange={(e) => setPatientCapacity(parseInt(e.target.value))}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <button
          onClick={handleAddRoom}
          className="bg-[#991b1b] text-white px-4 py-2 rounded hover:bg-[#c42f2f] transition-all"
        >
          Add Room
        </button>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AddRoomPage;
