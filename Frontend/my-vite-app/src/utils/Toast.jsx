import React from "react";

function Toast({ message, type }) {
  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 space-x-4 text-white rounded-lg shadow-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      role="alert"
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
        />
      </svg>
      <div className="text-sm font-normal">
        {message || "got something wrong "}
      </div>
    </div>
  );
}

export default Toast;
