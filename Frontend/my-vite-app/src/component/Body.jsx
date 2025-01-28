import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

function Body() {
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
