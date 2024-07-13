"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "@/components/footer/Footer";
import Cookies from "js-cookie";
import { auth } from "@/firebase/clientApp";

const MiddlePart = () => {
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
          <Link href={getRedirectUrl()}>
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
          </Link>
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
            width: "50%",
            borderRadius: "8px",
          }}
        >
          <div
            className=""
            style={{
              marginLeft: "18px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn-icons-gif.flaticon.com/15944/15944785.gif"
              alt="ambulance"
              style={{ width: "120px", marginLeft: "20px" }}
            />
            <h4
              style={{
                color: "red",
                fontWeight: "600",
                fontSize: "18px",
                width: "160px",
              }}
            >
              Emergency Help? We're here!
            </h4>
            <br />

            <h5
              style={{
                color: "#565656",
                width: "180px",
                fontSize: "12px",
                marginBottom: "12px",
              }}
              className=""
            >
              Relax! Don't panic, if it's an emergency, being in panic mode will
              only make the matters worse, dial the national emergency number
              asap, and click the emergency button to get the ambulance, the
              fastest from your nearest hospital, there is!
            </h5>
          </div>
          <div
            className=""
            style={{
              marginLeft: "18px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn-icons-gif.flaticon.com/16060/16060052.gif"
              alt="hospital"
              style={{ width: "120px", marginLeft: "20px" }}
            />
            <h4
              style={{
                color: "red",
                fontWeight: "600",
                fontSize: "18px",
                width: "160px",
              }}
            >
              Hospital help? We're here!
            </h4>
            <br />

            <h5
              style={{
                color: "#565656",
                width: "180px",
                fontSize: "12px",
                marginBottom: "12px",
              }}
              className=""
            >
              We're here to help you with the hospital management, we'll alert
              the designated staff members for the rooms that will be used for
              specific types of patients using ai/ml already, and you use AI to
              allocate patients room with snaps!
            </h5>
          </div>
          <div
            className=""
            style={{
              marginLeft: "18px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn-icons-gif.flaticon.com/16767/16767220.gif"
              alt="patient cruciality"
              style={{ width: "120px", marginLeft: "20px" }}
            />
            <h4
              style={{
                color: "red",
                fontWeight: "600",
                fontSize: "18px",
                width: "160px",
              }}
            >
              Patient status? We're here!
            </h4>
            <br />

            <h5
              style={{
                color: "#565656",
                width: "180px",
                fontSize: "12px",
                marginBottom: "12px",
              }}
              className=""
            >
              The website will help the user by using ml to check how critical
              the patient is, alert the staff, make the room prepared which will
              be needed by just taking a picture when the patient enters in, or
              preparing the environment, or alerting if the medicine isn't
              available in that centre, thanks to AI!
            </h5>
          </div>
        </div>
        <br />
      </center>
      <Footer />
    </>
  );
};

export default MiddlePart;
