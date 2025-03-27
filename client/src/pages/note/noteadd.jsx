import React, {  useState } from "react";

import { Link, useNavigate} from "react-router-dom";
import {  FaCalendarAlt } from "react-icons/fa"; // Importing icons

export default function Noteadd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  console.log(formData);
  const [validation, setValidation] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const detail = {
      
        ...formData
      };

      console.log(detail);

      const res = await fetch("http://localhost:3000/api/inventry/icreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(detail)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        console.log("sussessfull");
        alert("suscessfull");
        navigate("/Btable");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  //validation
  const handleamoutChange = (e) => {
    const purchasePrice = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (purchasePrice === "") {
      setValidation(null);
    } else if (!quantityPattern.test(purchasePrice)) {
      if (isNaN(purchasePrice)) {
        setValidation("amount must be a number");
      } else {
        setValidation("amount must be a positive integer");
      }
    } else {
      setFormData({ ...formData, purchasePrice });
      setValidation(null);
    }
  };

  return (
    <div
      className="relative w-full h-[800px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/vintage-old-rustic-cutlery-dark_1220-4886.jpg?alt=media&token=d9c24b0f-4046-4e50-ab02-2ca7d6ae8cba)"
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center w-full max-w-md mt-20 space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg opacity-90">
          <h1 className="text-3xl font-bold text-center text-white">
            Add Stock
          </h1>
          <Link
            to={`/`}
            className="text-md text-gray-400 hover:text-blue-400 underline"
          >
            Back
          </Link>
          {publishError && (
            <p className="text-red-500 text-sm">{publishError}</p>
          )}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex items-center space-x-2">
              <input
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                type="text"
                placeholder="title"
                id="description"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <textarea
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                type="text"
                placeholder="purchasePrice"
                id="purchasePrice"
                onChange={handleamoutChange}
                required
              />
            </div>

         

           

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
