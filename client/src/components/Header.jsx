import React from "react";
import { Link } from "react-router-dom"; // if you're using React Router

import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSilce"; // Correct the import path if necessary

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message); // Handle error if the response is not OK
      } else {
        dispatch(signoutSuccess()); // Dispatch the action to update Redux state after sign out
      }
    } catch (error) {
      console.log(error.message); // Handle fetch error
    }
  };

  return (
    <div className="bg-blue-600">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo Section */}
        <div>
          <img src="" alt="Logo" className="h-10" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
          {/* Home Link */}
          <li>
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>

          {/* About Link */}
          <li>
            <Link to="/about" className="text-white hover:text-gray-400">
              About
            </Link>
          </li>

          {/* Services Link */}
          <li>
            <Link to="/services" className="text-white hover:text-gray-400">
              Services
            </Link>
          </li>

          {/* Contact Link */}
          <li>
            <Link to="/contact" className="text-white hover:text-gray-400">
              Contact
            </Link>
          </li>

          {/* Conditional Rendering for Profile and SignOut Button */}
          {currentUser ? (
            <div className="flex items-center ml-auto">
              <Link to="/profile" className="flex items-center">
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </Link>
              <button
                onClick={handleSignout}
                className="text-white px-3 py-1 rounded-lg text-base md:text-lg font-serif hover:bg-blue-800 transition"
              >
                LogOut
              </button>
            </div>
          ) : (
            // If there's no currentUser, you can add a Login link or button here.
            <li>
              <Link to="/sign" className="text-white hover:text-gray-400">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
