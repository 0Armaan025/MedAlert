import React from "react";

type Props = {};

const MiddlePart = (props: Props) => {
  return (
    <>
      <div className="flex flex-row justify-start items-center">
        <div
          className="flex flex-col justify-start items-center ml-16"
          style={{ marginLeft: "16px", marginTop: "20px" }}
        >
          <h3
            className="text-white"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "34px",
              fontWeight: 600,
              width: "650px",
            }}
          >
            Have health / hospital problems? No problem! when MedAlert is there!
          </h3>
        </div>
        <div className="flex flex-col justify-start items-center"></div>
      </div>
    </>
  );
};

export default MiddlePart;
