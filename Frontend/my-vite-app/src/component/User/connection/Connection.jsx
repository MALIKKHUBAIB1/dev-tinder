import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../../../utils/store/connectionSlice";
import Toast from "../../../utils/Toast";
import ConnectionList from "./ConnectionList";

function Connection() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const timer = useRef(null);
  const connection = useSelector((state) => state.connection);

  async function fetchConnection() {
    try {
      setError(""); // Clear error before fetching
      const resp = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(resp?.data?.data));
    } catch (error) {
      setError(error?.response?.statusText || "Something went wrong");
    }
  }

  // Fetch data on mount
  useEffect(() => {
    fetchConnection();
  }, []);

  // Handle error timeout without re-fetching
  useEffect(() => {
    if (!error) return;
    timer.current = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timer.current);
  }, [error]);

  return (
    <div className="flex items-center flex-col min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {error && <Toast message={error} type={"error"} />}

      <h1 className="font-extrabold text-4xl text-gray-800 dark:text-white mb-6">
        Connections
      </h1>

      {connection?.length === 0 ? (
        <p className="text-gray-500 text-lg">No connections found.</p>
      ) : (
        connection &&
        connection.map((connection) => (
          <ConnectionList connection={connection} key={connection._id} />
        ))
      )}
    </div>
  );
}

export default Connection;
