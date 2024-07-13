"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { db } from "@/firebase/clientApp";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import Footer from "@/components/footer/Footer";
import Select from "react-select";
import Navbar from "@/components/navbar/Navbar";

const RoomManagementPage = () => {
  const pathname = usePathname();
  const [roomData, setRoomData] = useState(null);
  const [name, setName] = useState("");
  const hospitalCode = Cookies.get("hospitalCode");
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [facultyOptions, setFacultyOptions] = useState([]);

  useEffect(() => {
    const coolThing = pathname.split("/").slice(2).join("/") as string;
    setName(coolThing);
    const fetchRoomData = async () => {
      if (name && hospitalCode) {
        const roomDocRef = doc(db, "rooms", name as string);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
          setRoomData(roomDoc.data() as any);
        } else {
          console.log("No such room!");
        }
      }
    };

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

    fetchRoomData();
    fetchFacultyMembers();
  }, [name, hospitalCode]);

  const handleFacultyChange = (selected: any) => {
    setFacultyMembers(selected);
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setRoomData((prevData: any) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedRoomData = {
      ...(roomData as any),
      facultyMembers: facultyMembers.map((member: any) => member.value),
      hospitalCode,
    };

    const roomDocRef = doc(db, "rooms", name as string);
    await setDoc(roomDocRef, updatedRoomData, { merge: true });
  };

  if (!roomData) {
    return <div>Loading...</div>;
  }

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
              value={roomData.roomName as never}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter room name"
              readOnly
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
              value={roomData.description as never}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter room description"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="faculty"
            >
              Select Faculty
            </label>
            <Select
              isMulti
              options={facultyOptions}
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
              value={roomData.patients as never}
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

export default RoomManagementPage;
