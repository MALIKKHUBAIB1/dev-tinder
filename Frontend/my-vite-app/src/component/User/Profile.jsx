import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.userReducer);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-500 shadow-lg rounded-lg p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white">
          Welcome to Your Profile - {user.firstName}
        </h1>
      </div>
    </div>
  );
}

export default Profile;
