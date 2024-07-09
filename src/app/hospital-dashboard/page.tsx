import DashboardLeftSideBar from "@/components/dashboard-left-side-bar/DashboardLeftSideBar";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import "./hospitaldashboardpage.css";

type Props = {};

const HospitalDashboardPage = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="hospitalDashboardPage flex flex-row justify-start items-start">
        <DashboardLeftSideBar />

        <div className="ml-16">
          <center>
            <input
              type="button"
              value="Add room"
              className="w-28 text-white rounded-sm px-4 py-2 cursor-pointer transition-all hover:bg-[#c62222] bg-[#991b1b]"
            />
            <div className="flex flex-row justify-center items-center">
              <h4
                className="text-white font-thin mt-4 text-2xl"
                style={{ fontFamily: "Ga Maamli, sans-serif" }}
              >
                Code: 374311
              </h4>
              <img
                src="https://cdn-icons-gif.flaticon.com/11677/11677427.gif"
                className="w-6 mt-3 ml-2 cursor-pointer "
              />
            </div>
            <br />

            <div className="flex flex-row">
              <div className="flex flex-col justify-center items-center"></div>
            </div>
          </center>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default HospitalDashboardPage;
