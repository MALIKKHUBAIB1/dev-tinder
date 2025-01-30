import React from "react";
import { useNavigate } from "react-router";

function Error({ message, status }) {
  const navigate = useNavigate();
  function handleBack() {
    navigate("/");
  }
  return (
    <>
      <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <strong className="font-bold text-lg">Error {status || 500}: </strong>
        <span className="block sm:inline">
          {message || "somethin went wrong "}
        </span>
      </div>
      <button onClick={handleBack} className="text-rose-100 text-xl border p-3 m-2 rounded-2xl">
        Go Home
      </button>
    </>
  );
}

export default Error;
