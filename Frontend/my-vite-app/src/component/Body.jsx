import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const user = useSelector((state) => state.userReducer);

  async function getUserProfile() {
    if (user) return; // If user exists, don't fetch profile again.
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data)); // Dispatch user data to Redux store
    } catch (error) {
      if (
        error.response?.status === 401 &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup"
      ) {
        navigate("/login");
      }
      setError(error.response?.data || "An error occurred");
    }
  }

  useEffect(() => {
    if (location.pathname === "/signup" && user) {
      navigate("/");
    }

    if (!user) {
      getUserProfile(); // Only fetch user profile if user is not already set
    }
  }, [user, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Body;
