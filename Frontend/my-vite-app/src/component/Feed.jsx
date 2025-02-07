import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";
import Toast from "../utils/Toast";
import UserCard from "./User/UserCard";

function Feed() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const timer = useRef(null);

  async function getFeed() {
    try {
      if (feed.length > 0) return; // Prevent unnecessary API calls

      const resp = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });

      if (resp?.data.data && Array.isArray(resp.data.data)) {
        dispatch(addFeed(resp.data.data)); // Store the entire feed
      } else {
        setError("Invalid data format received.");
        setShow(true);
      }
    } catch (error) {
      setError(error?.response?.statusText || "Something went wrong");
      setShow(true);
    }
  }
  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (error) {
      setShow(true);
      timer.current = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    return () => clearTimeout(timer.current);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {show && <Toast message={error} type="error" />}
      <div className="text-center">
        {!feed && <h1 className="text-4xl mb-4">Your Feed Page</h1>}
      </div>
      {!feed || feed.length === 0 ? (
        <h1 className="text-4xl mb-4">No Feed</h1>
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
  );
}

export default Feed;
