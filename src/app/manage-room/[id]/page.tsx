import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const ManageRoomScreen = () => {
  return (
    <>
      <Navbar />
      <div className="manageRoomScreenDiv flex flex-col items-center p-4  min-h-screen">
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
            <select
              id="faculty"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="doctor">Name 1</option>
              <option value="nurse">Name 2</option>
              <option value="admin">Name 3</option>
              <option value="other">name </option>
            </select>
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
