import React from "react";
import {
  FaWeight,
  FaRulerVertical,
  FaHeartbeat,
  FaSyringe,
  FaDisease,
  FaFileMedicalAlt,
  FaAllergies,
  FaLayerGroup,
} from "react-icons/fa";

const UserDataCard = ({ user }: { user: any }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-full max-w-sm hover:cursor-pointer transition-all hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
      <p className="text-gray-700 mb-4">🔥Age: {user.age}</p>
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
      <div className="flex items-center mb-2">
        <FaDisease className="text-blue-500 mr-2" />
        <span className="text-gray-700">Diseases: {user.diseases}</span>
      </div>
      <div className="flex items-center mb-2">
        <FaFileMedicalAlt className="text-blue-500 mr-2" />
        <span className="text-gray-700">Medications: {user.medications} </span>
      </div>

      <div className="flex items-center mb-2">
        <FaDisease className="text-green-500 mr-2" />
        <span className="text-gray-700">Symptoms: {user.symptoms} </span>
      </div>
      <div className="flex items-center mb-2">
        <FaAllergies className="text-red-500 mr-2" />
        <span className="text-gray-700">Allergies: {user.allergies} </span>
      </div>
      <div className="flex items-center mb-2">
        <FaLayerGroup className="text-red-500 mr-2" />
        <span className="text-gray-700">
          Family History: {user.familyHistory}{" "}
        </span>
      </div>
    </div>
  );
};

export default UserDataCard;
