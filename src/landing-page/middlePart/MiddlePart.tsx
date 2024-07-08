import React from "react";

type Props = {};

const MiddlePart = (props: Props) => {
  return (
    <>
      <div className="flex flex-row justify-start items-center">
        <div
          className="flex flex-col justify-start items-center ml-8"
          style={{
            marginLeft: "32px",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <h3
            className="text-white"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "32px",
              fontWeight: 600,
              width: "600px",
            }}
          >
            Have health / hospital problems? No problem! when MedAlert is there!
          </h3>
          <br />
          <br />
          <h5
            className=""
            style={{
              fontFamily: "Poppins",
              width: "500px",
              color: "#b4b4b4",
              fontSize: "14px",
            }}
          >
            MedAlert helps alerting the hospitals regarding the status of the
            patient, ex: how critical they are, if rooms are full or not etc. it
            will also help contact the nearest ambulance
          </h5>
          <br />
          <br />
          <br />
          <input
            type="button"
            value="Start using it"
            className=""
            style={{
              background: "#e2481e",
              color: "whitesmoke",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "6px",
              paddingBottom: "6px",
              borderRadius: "16px",
              fontFamily: "Mukta, sans-serif",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="flex flex-col justify-start items-center mr-32">
          <img
            src="/ambulance.png"
            style={{ mixBlendMode: "normal", width: "630px" }}
          />
        </div>
      </div>
      <br />
      <br />
      <center>
        <div
          className="flex flex-row justify-start items-center"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            background: "white",
            padding: "2px",
          }}
        >
            
        </div>
      </center>
    </>
  );
};

export default MiddlePart;
