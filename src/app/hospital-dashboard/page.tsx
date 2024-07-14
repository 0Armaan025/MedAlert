"use client";
import React, { useEffect, useState } from "react";
import DashboardLeftSideBar from "@/components/dashboard-left-side-bar/DashboardLeftSideBar";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import HospitalRoomComponent from "@/components/hospital-room-component/HospitalRoomComponent";
import { db } from "@/firebase/clientApp";
import Cookies from "js-cookie";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

type Room = {
  title: string;
  description: string;
  roomId: string;
};

const HospitalDashboardPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hospitalCode, setHospitalCode] = useState<string>("");

  useEffect(() => {
    const cookies = Cookies.get("hospitalCode");
    if (cookies) {
      setHospitalCode(cookies);
      fetchRooms(cookies);
    }
  }, []);

  const fetchRooms = async (hospitalCode: string) => {
    try {
      const q = query(
        collection(db, "rooms"),
        where("hospitalCode", "==", hospitalCode)
      );
      const querySnapshot = await getDocs(q);
      const roomsData: Room[] = [];
      querySnapshot.forEach((doc) => {
        roomsData.push({ ...doc.data(), roomId: doc.id } as Room);
      });
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Navbar />
      <div className="hospitalDashboardPage flex flex-col md:flex-row justify-start items-start">
        <DashboardLeftSideBar />
        <div className="ml-8 md:ml-16 w-full">
          <div className="flex flex-col md:flex-row justify-center items-center mb-4">
            <h4 className="text-white font-thin text-2xl mb-2 md:mb-0">
              Code: {hospitalCode}
            </h4>
            <button
              onClick={() => copyToClipboard(hospitalCode)}
              className="ml-2 bg-[#991b1b] hover:bg-[#c62222]  text-white rounded-sm px-4 py-2 cursor-pointer transition-all"
            >
              Copy
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {rooms.map((room: Room) => (
              <Link href={`/manage-room/${room.title}`}>
                <HospitalRoomComponent
                  key={room.roomId}
                  title={room.title}
                  description={room.description}
                />
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              className="text-white rounded-sm px-4 py-2 bg-[#991b1b] hover:bg-[#c62222] cursor-pointer transition-all"
              href="/add-room"
            >
              Add Room
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HospitalDashboardPage;
