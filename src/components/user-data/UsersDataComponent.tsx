import React from "react";
import {
  FaWeight,
  FaRulerVertical,
  FaHeartbeat,
  FaSyringe,
} from "react-icons/fa";

const UserDataCard = ({ user }: { user: any }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-full max-w-sm hover:cursor-pointer transition-all hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
      <p className="text-gray-700 mb-4">Age: {user.age}</p>
      <div className="flex items-center mb-2">
        <FaWeight className="text-blue-500 mr-2" />
        <span className="text-gray-700">Weight: {user.weight} kg</span>
      </div>
      <div className="flex items-center mb-2">
        <FaRulerVertical className="text-green-500 mr-2" />
        <span className="text-gray-700">Height: {user.height} cm</span>
      </div>
      <div className="flex items-center mb-2">
        <FaHeartbeat className="text-red-500 mr-2" />
        <span className="text-gray-700">Heart Rate: {user.heartRate} bpm</span>
      </div>
      <div className="flex items-center mb-2">
        <FaSyringe className="text-yellow-500 mr-2" />
        <span className="text-gray-700">
          Blood Pressure: {user.bloodPressure}
        </span>
      </div>
      <p className="text-gray-700 mb-2">Diseases: {user.diseases}</p>
      <p className="text-gray-700 mb-2">Symptoms: {user.symptoms}</p>
      <p className="text-gray-700 mb-2">Medications: {user.medications}</p>
      <p className="text-gray-700 mb-2">Allergies: {user.allergies}</p>
      <p className="text-gray-700 mb-2">Family History: {user.familyHistory}</p>
    </div>
  );
};

export default UserDataCard;
