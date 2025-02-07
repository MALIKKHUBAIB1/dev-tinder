import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../../utils/const";
import Toast from "../../../utils/Toast";
import { useDispatch } from "react-redux";
import { removePendingRequest } from "../../../utils/store/requestSlice";

function RequestList({ req }) {
  const [sucess, setSucess] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { firstName, lastName, about, photoUrl, _id } = req;
  async function handleConnection(status, id) {
    if (!status || !id) return;
    const url = `${BASE_URL}request/review/${status}/${id}`;
    try {
      const resp = await axios.post(url, {}, { withCredentials: true });
      if (resp.status === 200) {
        setSucess("connection send successfully");
        setType("success");
        dispatch(removePendingRequest(id));
      }
    } catch (error) {
      setSucess(error?.response?.data.message || "Something went wrong");
      setType("error");
    }
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden p-5 flex flex-col md:flex-row items-center md:items-start gap-6 transition-all hover:scale-[1.02]">
      {/* Left Side - Image */}
      {sucess && <Toast message={sucess} type={type} />}
      <img
        src={photoUrl || "https://via.placeholder.com/150"}
        alt={`${firstName} ${lastName}`}
        className="h-32 w-32 md:h-40 md:w-40 object-cover rounded-2xl border-2 shadow-md"
      />

      {/* Right Side - Text */}
      <div className="flex flex-col flex-1 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
          {firstName} {lastName}
        </h2>

        <p className="text-gray-600 mt-2 dark:text-gray-400 text-sm md:text-base">
          {about}
        </p>

        {/* Buttons Section - Smaller & Aligned */}
        <div className="flex gap-3 mt-4 md:mt-6 md:self-start">
          <button
            className="bg-green-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-green-600 transition shadow-md"
            onClick={() => handleConnection("accept", _id)}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-red-600 transition shadow-md"
            onClick={() => handleConnection("reject", _id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestList;
