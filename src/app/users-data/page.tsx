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
        console.log(doc.id, " => ", doc.data());
        userList.push({ id: doc.id, ...doc.data() });
      });
      setUserData(userList);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row w-full justify-start items-center">
        {/* UI elements */}
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
