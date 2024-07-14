"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/clientApp";
import Navbar from "@/components/navbar/Navbar";
import UserDataCard from "@/components/user-data/UsersDataComponent";
import Footer from "@/components/footer/Footer";
import { collection, getDocs } from "firebase/firestore";

const UsersData = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = collection(db, "users-data");
      const snapshot = await getDocs(usersCollection);
      const userList = [] as any;
      snapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() });
      });
      setUserData(userList);
    };

    fetchData();
  }, []);

  // Function to convert array of objects to CSV
  const convertToCSV = (data:any) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((user:any) => Object.values(user).join(","));
    return [header, ...rows].join("\n");
  };

  // Function to download CSV file
  const downloadCSV = () => {
    const csv = convertToCSV(userData);
    const csvBlob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(csvBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users-data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row w-full justify-start items-center">
        <h3
          className="text-4xl font-bold text-white ml-8"
          style={{ fontFamily: "Poppins" }}
        >
          Users Data
        </h3>
        <input
          type="button"
          value="Download CSV"
          onClick={downloadCSV}
          className="w-40 px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer rounded-md ml-8 mt-1"
        />

        <input
          type="button"
          value="Train model now (coming soon)"
          className="w-72 px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer rounded-md ml-8 mt-1"
          disabled // Placeholder for disabled button
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {userData.map((user, index) => (
          <UserDataCard key={index} user={user} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default UsersData;
