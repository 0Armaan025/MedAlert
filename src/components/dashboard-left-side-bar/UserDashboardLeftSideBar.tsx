import React from "react";
import "./dashboardleftsidebar.css";

type Props = {};

const UserDashboardLeftSideBar = (props: Props) => {
  return (
    <>
      <div className="dashboardLeftSideBar w-60  flex flex-col  bg-slate-50 justify-center items-start rounded-sm">
        <div className="item flex flex-row justify-start p-2 items-center bg-slate-50 w-full hover:bg-slate-300 cursor-pointer">
          <img
            src="https://cdn-icons-gif.flaticon.com/16678/16678185.gif"
            className="w-12 mix-blend-multiply"
          />
          <h4
            className="text-lg ml-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Add Data
          </h4>
        </div>
        <div className="w-full bg-[#1e1e1e] h-[1px]"></div>
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
      </div>
    </>
  );
};

export default UserDashboardLeftSideBar;
