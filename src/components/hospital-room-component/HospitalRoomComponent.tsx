import React from "react";

type Props = {};

const HospitalRoomComponent = (props: Props) => {
  return (
    <>
      <div className="h-40 w-[25rem] rounded border-[1.5px] border-white  cursor-pointer hover:scale-105  transition-all bg-[#3d1729] p-3 flex flex-col justify-center items-center">
        <h4
          style={{ fontFamily: "Poppins,sans-serif" }}
          className="text-white font-semibold text-xl"
        >
          Room Name
        </h4>
        <br />
        <p className="text-white" style={{ fontFamily: "Poppins" }}>
          Proident aliquip aute sunt pariatur sint laboris adipisicing aute non
          est ea dolore. Veniam irure occaecat nulla tempor incididunt minim
        </p>
      </div>
    </>
  );
};

export default HospitalRoomComponent;
