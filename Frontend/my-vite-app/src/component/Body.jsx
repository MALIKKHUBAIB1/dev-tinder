import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Error from "../utils/Error";
function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector((state) => state.userReducer);
  async function getUserProfile() {
    if (user) return;
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      setError(error.response.data);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, [user]);
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
