import React from "react";
import Link from "next/link";

const DashboardLeftSideBar = () => {
  return (
    <div className="dashboardLeftSideBar w-72 flex flex-col bg-slate-50 justify-center items-start rounded-sm">
      <Link href="/hospital-dashboard">
        <div className="item flex flex-row justify-center p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/13099/13099870.gif"
            className="w-12 mix-blend-multiply"
            alt="Hospital Management"
          />
          <h4 className="text-lg ml-4 font-poppins">Hospital Management</h4>
        </div>
      </Link>
      <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
      <Link href="/send-alert">
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/11201/11201846.gif"
            className="w-12 mix-blend-multiply"
            alt="Send Alerts"
          />
          <h4 className="text-lg ml-4 font-poppins">Send Alerts</h4>
        </div>
      </Link>
      <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
      <Link href="/alerts">
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/14642/14642503.gif"
            className="w-12 mix-blend-multiply"
            alt="Notifications"
          />
          <h4 className="text-lg ml-4 font-poppins">Notifications</h4>
        </div>
      </Link>
      <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
      <Link href="/track-patients">
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/8121/8121309.gif"
            className="w-12 mix-blend-multiply"
            alt="Patients tracker"
          />
          <h4 className="text-lg ml-4 font-poppins">Patients tracker</h4>
        </div>
      </Link>
      <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
      <Link href="/users-data">
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/15401/15401342.gif"
            className="w-12 mix-blend-multiply"
            alt="Data"
          />
          <h4 className="text-lg ml-4 font-poppins">Data</h4>
        </div>
      </Link>
      <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
      <Link href="/patient-entry">
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/128/5047/5047718.png"
            className="w-12 mix-blend-multiply"
            alt="Data"
          />
          <h4 className="text-lg ml-4 font-poppins">Patient Entry</h4>
        </div>
      </Link>
      <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
      <Link href="/room-management">
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/9121/9121641.gif"
            className="w-12 mix-blend-multiply"
            alt="Data"
          />
          <h4 className="text-lg ml-4 font-poppins">Manage rooms</h4>
        </div>
      </Link>
    </div>
  );
};

export default DashboardLeftSideBar;
