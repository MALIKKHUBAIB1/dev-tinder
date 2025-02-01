import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/const";

function Connection() {
  async function fetchConnection() {
    const [error,setError] = useState("")
    try {
      const resp = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      console.log(resp.data.data);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    fetchConnection();
  }, []);
  return (
    <div className="flex justify-center my-10">
      {}
      <h1 className="font-bold text-3xl">Connection </h1>
    </div>
  );
}

export default Connection;
