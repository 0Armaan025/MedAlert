import React from "react";
import "./navbar.css";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex-grow flex justify-center">
        <Link href="/">
          <img
            src="/logo.png"
            alt="MedAlert Logo"
            className="w-52 h-18 ml-48 cursor-pointer"
          />
        </Link>
      </div>
      <Link href="/emergency">
        <input
          type="button"
          value="Emergency"
          className=" px-4 py-2 rounded-3xl cursor-pointer text-white bg-red-600 hover:bg-red-800 transition mr-2"
        />
      </Link>
      <Link href="/hospital-dashboard">
        <input
          type="button"
          value="Dashboard"
          className="border-2 border-white px-4 py-2 rounded-3xl cursor-pointer text-white hover:bg-white transition  hover:border-black hover:text-black"
        />
      </Link>
    </div>
  );
};

export default Navbar;
