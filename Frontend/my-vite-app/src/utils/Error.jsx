import React from "react";

function Error({ message, status }) {
  return (
    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <strong className="font-bold text-lg">Error {status}: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}

export default Error;
