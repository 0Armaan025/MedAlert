import React from "react";
import "./dashboardleftsidebar.css";

type Props = {};

const DashboardLeftSideBar = (props: Props) => {
  return (
    <>
      <div className="dashboardLeftSideBar w-72  flex flex-col  bg-slate-50 justify-center items-start rounded-sm">
        <div className="item flex flex-row justify-center p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/13099/13099870.gif"
            className="w-12 mix-blend-multiply"
          />
          <h4
            className="text-lg ml-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Hospital Management
          </h4>
        </div>
        <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/14642/14642503.gif"
            className="w-12 mix-blend-multiply"
          />
          <h4
            className="text-lg ml-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Notifications
          </h4>
        </div>
      </div>
    </>
  );
};

export default DashboardLeftSideBar;
