"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "@/components/footer/Footer";
import Cookies from "js-cookie";
import { auth } from "@/firebase/clientApp";
import "./middlepart.css";

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
        <div className="randomClassName">
          <h3 className="title">
            Have health / hospital problems? No problem! when MedAlert is there!
          </h3>
          <br />
          <br />
          <h5 className="description">
            MedAlert helps alerting the hospitals regarding the status of the
            patient, ex: how critical they are, if rooms are full or not etc. it
            will also help contact the nearest ambulance
          </h5>
          <br />
          <br />
          <br />
          <Link href={getRedirectUrl()}>
            <input type="button" value="Start using it" className="button" />
          </Link>
        </div>
        <div className="randomClassName">
          <img src="/ambulance.png" className="image" />
        </div>
      </div>
      <br />
      <br />
      <center>
        <div className="flex flex-row justify-start items-center featuresContainer">
          <div className="randomClassName">
            <img
              src="https://cdn-icons-gif.flaticon.com/15944/15944785.gif"
              alt="ambulance"
              className="featureImage"
            />
            <h4 className="featureTitle">Emergency Help? We're here!</h4>
            <br />
            <h5 className="featureDescription">
              Relax! Don't panic, if it's an emergency, being in panic mode will
              only make the matters worse, dial the national emergency number
              asap, and click the emergency button to get the ambulance, the
              fastest from your nearest hospital, there is!
            </h5>
          </div>
          <div className="randomClassName">
            <img
              src="https://cdn-icons-gif.flaticon.com/16060/16060052.gif"
              alt="hospital"
              className="featureImage"
            />
            <h4 className="featureTitle">Hospital help? We're here!</h4>
            <br />
            <h5 className="featureDescription">
              We're here to help you with the hospital management, we'll alert
              the designated staff members for the rooms that will be used for
              specific types of patients using ai/ml already, and you use AI to
              allocate patients room with snaps!
            </h5>
          </div>
          <div className="randomClassName">
            <img
              src="https://cdn-icons-gif.flaticon.com/16767/16767220.gif"
              alt="patient cruciality"
              className="featureImage"
            />
            <h4 className="featureTitle">Patient status? We're here!</h4>
            <br />
            <h5 className="featureDescription">
              The website will help the user by using ml to check how critical
              the patient is, alert the staff, make the room prepared which will
              be needed by just taking a picture when the patient enters in, or
              preparing the environment, or alerting if the medicine isn't
              available in that centre, thanks to AI!
            </h5>
          </div>
        </div>
      </center>
      <Footer />
    </>
  );
};

export default MiddlePart;
