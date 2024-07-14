import React, { useEffect, useState } from "react";
import "./navbar.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { auth } from "@/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";

type Props = {};

const Navbar = (props: Props) => {

  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userType = Cookies.get("userType");

        if (userType === "hospital" || userType === "hospitalStaff") {
          setUser("hospital");
        } else {
          setUser("user");
        }
      } else {
        setUser("none");
      }
    });
  }, [auth]);

  const getRedirectUrl = () => {
    if (user === "hospital") {
      return "/hospital-dashboard";
    } else if (user === "user") {
      return "/user-dashboard";
    } else {
      return "/auth";
    }
  };
  return (
    <nav className=" p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow flex justify-center md:justify-start">
          <Link href="/">
            <img
              src="/logo.png"
              alt="MedAlert Logo"
              className="w-32 md:w-52 h-18 cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/emergency"
            className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition"
          >
            Emergency
          </Link>
          <Link href={getRedirectUrl()}
            className="px-4 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-gray-800 transition"
            
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
