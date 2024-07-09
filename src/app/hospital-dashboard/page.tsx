import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

type Props = {};

const HospitalDashboardPage = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="hospitalDashboardPage"></div>
      <Footer />
    </>
  );
};

export default HospitalDashboardPage;
