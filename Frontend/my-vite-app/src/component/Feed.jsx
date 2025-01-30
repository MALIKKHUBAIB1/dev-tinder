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
      if (feed && feed.length > 0) return; // Prevent unnecessary API calls
      const resp = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      console.log(feed);
      dispatch(addFeed(resp.data));
    } catch (error) {
      console.log(error);
      setError(error?.response?.statusText || "Something went wrong");
      setShow(true); // Show toast when an error occurs
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

    return () => {
      clearTimeout(timer.current);
    };
  }, [error]); // Only re-run when `error` changes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {show && <Toast message={error} type="error" />}
      <div className="text-center">
        <h1 className="text-4xl mb-4">Your Feed Page</h1>
      </div>
      {feed && <UserCard user={feed.data[0]} />}
    </div>
  );
}

export default Feed;
