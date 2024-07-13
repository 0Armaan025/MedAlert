import React from "react";

type Props = {
  title: string;
  description: string;
};
const HospitalRoomComponent: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <div className="h-40 w-[25rem] rounded border-[1.5px] border-white  cursor-pointer hover:scale-105  transition-all bg-[#3d1729] p-3 flex flex-col justify-center items-center">
        <h4
          style={{ fontFamily: "Poppins,sans-serif" }}
          className="text-white font-semibold text-xl"
        >
          {title}
        </h4>
        <br />
        <p className="text-white" style={{ fontFamily: "Poppins" }}>
          {description}
        </p>
      </div>
    </>
  );
};

export default HospitalRoomComponent;
