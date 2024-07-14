"use client";
import React, { useEffect, useState } from "react";
import AlertComponent from "@/components/notification/NotificationComponent";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { db } from "@/firebase/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";
import "./notificationalertspage.css";

type Alert = {
  type: string;
  message: string;
  timestamp: string;
  title: string;
};

const NotificationAlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const hospitalCode = Cookies.get("hospitalCode");
      if (!hospitalCode) {
        alert("Hospital code not found in cookies");
        return;
      }

      const q = query(
        collection(db, "alerts"),
        where("hospitalCode", "==", hospitalCode)
      );

      const querySnapshot = await getDocs(q);
      const alertsData: Alert[] = querySnapshot.docs.map((doc) => ({
        type: doc.data().type,
        message: doc.data().message,
        timestamp: doc.data().date,
        title: doc.data().title,
      }));

      setAlerts(alertsData);
    };

    fetchAlerts();
  }, []);

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
          {alerts.map((alert: any, index: any) => (
            <AlertComponent key={index} alert={alert} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationAlertsPage;
