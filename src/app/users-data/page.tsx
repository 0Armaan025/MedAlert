import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import UserDataCard from "@/components/user-data/UsersDataComponent";
import React from "react";

type Props = {};
const dummyUserData = [
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },

  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
  {
    name: "John Doe",
    age: 30,
    weight: 70,
    height: 175,
    heartRate: 70,
    bloodPressure: "120/80",
    diseases: "None",
    symptoms: "None",
    medications: "None",
    allergies: "None",
    familyHistory: "None",
  },
];

const UsersData = (props: Props) => {
  return (
    <>
      <Navbar />{" "}
      <div className="flex flex-row w-full justify-start items-center">
        <h2
          className="text-3xl font-semibold mb-4 ml-8 text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          User Health Data
        </h2>
        <input
          type="button"
          value="Train a model"
          className="py-2 px-4 bg-red-600 hover:bg-red-700 cursor-pointer text-white transition-all mb-2 ml-4 rounded-md"
        />
        <input
          type="button"
          value="Open .CV file"
          className="py-2 px-4 bg-red-600 hover:bg-red-700 cursor-pointer text-white transition-all mb-2 ml-4 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {dummyUserData.map((user: any, index: any) => (
          <UserDataCard key={index} user={user} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default UsersData;
