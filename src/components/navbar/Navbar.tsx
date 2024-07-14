import React from "react";
import "./navbar.css";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
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
          <Link
            className="px-4 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-gray-800 transition"
            href="/hospital-dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
