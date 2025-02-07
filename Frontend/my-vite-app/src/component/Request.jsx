import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/const";
import Toast from "../utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/store/requestSlice";
import RequestList from "./User/connection/RequestList";

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
      if (error?.response?.data?.message === "there is no connection found ") {
        return;
      }
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
    <div className="flex items-center flex-col min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {!requestConnection ? (
        <p className="text-3xl font-bold my-5 text-gray-900 dark:text-white">
          No Connection request Found{" "}
        </p>
      ) : (
        error && <Toast message={error} type={error} />
      )}

      {requestConnection && (
        <h2 className="text-3xl font-bold my-5 text-gray-900 dark:text-white">
          Pending Connection Requests
        </h2>
      )}

      <div className="w-full max-w-4xl space-y-6">
        {requestConnection &&
          requestConnection.map((req) => {
            return (
              <RequestList
                req={req.formUserID}
                key={req._id}
                toUserId={req.toUserId}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Request;
