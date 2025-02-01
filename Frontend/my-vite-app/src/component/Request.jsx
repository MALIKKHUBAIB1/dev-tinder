import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/const";
import Toast from "../utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/store/requestSlice";
import ConnectionList from "./User/connection/ConnectionList";

function Request() {
  
  const [error, setError] = useState("");
  const requestConnection = useSelector((state) => state.request);
  const timer = useRef(null);
  const dispatch = useDispatch();

  async function getConnetionRequest() {
    try {
      const resp = await axios.get(BASE_URL + "user/requests/recived", {
        withCredentials: true,
      });
      dispatch(addRequest(resp?.data?.data));
    } catch (error) {
      setError(error?.response?.statusText || "Something went wrong");
    }
  }

  useEffect(() => {
    timer.current = setTimeout(() => {
      setError("");
    }, 3000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [error]);

  useEffect(() => {
    getConnetionRequest();
  }, []);

  return (
    <div className="flex items-center flex-col min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      {error && <Toast message={error} type={error} />}

      <h2 className="text-3xl font-bold my-5 text-gray-900 dark:text-white">
        {requestConnection && requestConnection.length === 0
          ? "No Connection Pending "
          : "Connection Pending"}
      </h2>

      <div className="w-full max-w-4xl">
        {requestConnection &&
          requestConnection.map((req) => (
            <div key={req._id} className="my-4 w-full">
              <ConnectionList connection={req.formUserID} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Request;
