import React from "react";
import "./dashboardleftsidebar.css";
import Link from "next/link";

type Props = {};

const DashboardLeftSideBar = (props: Props) => {
  return (
    <>
      <div className="dashboardLeftSideBar w-72  flex flex-col  bg-slate-50 justify-center items-start rounded-sm">
        <Link href="/hospital-dashboard" className="w-full">
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
        </Link>
        <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
        <Link href="/send-alert" className="w-full">
          <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
            <img
              src="https://cdn-icons-gif.flaticon.com/11201/11201846.gif"
              className="w-12 mix-blend-multiply"
            />
            <h4
              className="text-lg ml-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Send Alerts
            </h4>
          </div>
        </Link>
        <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
        <Link href="/alerts" className="w-full">
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
        </Link>
        <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
        <Link href="/track-patients" className="w-full">
          <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
            <img
              src="https://cdn-icons-gif.flaticon.com/8121/8121309.gif"
              className="w-12 mix-blend-multiply"
            />
            <h4
              className="text-lg ml-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Patients tracker
            </h4>
          </div>
        </Link>
        <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
        <Link href="/users-data" className="w-full">
          <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
            <img
              src="https://cdn-icons-gif.flaticon.com/15401/15401342.gif"
              className="w-12 mix-blend-multiply"
            />
            <h4
              className="text-lg ml-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Data
            </h4>
          </div>
        </Link>
      </div>
    </>
  );
};

export default DashboardLeftSideBar;
