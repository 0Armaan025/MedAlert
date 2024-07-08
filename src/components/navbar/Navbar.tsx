import React from "react";
import "./navbar.css";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex-grow flex justify-center">
        <img
          src="/logo.png"
          alt="MedAlert Logo"
          className="w-48 h-18 ml-32 cursor-pointer"
        />
      </div>
      <input
        type="button"
        value="Emergency"
        className=" px-4 py-2 rounded-3xl cursor-pointer text-white bg-red-600 hover:bg-red-800 transition mr-2"
      />
      <input
        type="button"
        value="Dashboard"
        className="border-2 border-white px-4 py-2 rounded-3xl cursor-pointer text-white hover:bg-white transition  hover:border-black hover:text-black"
      />
    </div>
  );
};

export default Navbar;
