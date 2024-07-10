import React from "react";
import AlertComponent from "@/components/notification/NotificationComponent";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "./notificationalertspage.css";

type Alert = {
  type: string;
  message: string;
  timestamp: string;
};

const alerts: Alert[] = [
  {
    type: "incoming",
    message: "New patient incoming to Room 101.",
    timestamp: "2024-07-10 10:45 AM",
  },
  {
    type: "predicted",
    message: "Predicted problem in Room 202. Possible equipment failure.",
    timestamp: "2024-07-10 09:30 AM",
  },
  {
    type: "critical",
    message:
      "Critical condition detected in Room 305. Immediate attention required.",
    timestamp: "2024-07-10 08:15 AM",
  },
];

const NotificationAlertsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="notification-alerts-page p-8">
        <h2
          className="text-3xl font-bold mb-6 text-white"
          style={{ fontFamily: "Poppins" }}
        >
          Notifications & Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert, index) => (
            <AlertComponent key={index} alert={alert} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationAlertsPage;
