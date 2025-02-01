import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { removeUser } from "../utils/store/userSlice";

const Navbar = () => {
  const [showDashBoard, setShowDashBoard] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown
  const userButtonRef = useRef(null); // Ref for the user button
  const user = useSelector((state) => state.userReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  // Toggle dropdown visibility
  function handleShow() {
    setShowDashBoard(!showDashBoard);
  }
  async function handleSignOut() {
    try {
      const resp = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      console.log(resp);
      dispatch(removeUser());
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  // Close the dropdown when clicking outside
  useEffect(() => {
    // Function to handle click outside dropdown
    function handleOutsideClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !userButtonRef.current.contains(event.target)
      ) {
        setShowDashBoard(false); // Close dropdown
      }
    }

    // Add event listener on component mount
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array to add the event listener only once

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Dev Tinder
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded={showDashBoard ? "true" : "false"}
          onClick={handleShow}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {user && (
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/about"
                  className={`block py-2 px-3 rounded-sm md:p-0 
              ${
                location.pathname === "/about"
                  ? "text-blue-700 dark:text-blue-500"
                  : "text-gray-900 dark:text-white"
              } 
              hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 
              dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-2 px-3 rounded-sm md:p-0 
              ${
                location.pathname === "/contact"
                  ? "text-blue-700 dark:text-blue-500"
                  : "text-gray-900 dark:text-white"
              } 
              hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 
              dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/price"
                  className={`block py-2 px-3 rounded-sm md:p-0 
              ${
                location.pathname === "/price"
                  ? "text-blue-700 dark:text-blue-500"
                  : "text-gray-900 dark:text-white"
              } 
              hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 
              dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  price
                </Link>
              </li>
              <li>
                <Link
                  to="/user/connection"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Connection
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* User menu and dropdown container */}
        {user && (
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            {/* User menu button */}
            <p className="mx-4 font-light">Welcome {user.firstName}</p>
            <button
              ref={userButtonRef} // Ref for the user button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded={showDashBoard ? "true" : "false"}
              onClick={handleShow}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={
                  user.photoUrl
                    ? user.photoUrl
                    : "https://img.freepik.com/free-vector/young-prince-vector-illustration_1308-174367.jpg?t=st=1738070130~exp=1738073730~hmac=64f9c0f73e3f3b324e8b6dc2d5cd379e8f9f47965905f979821a054b16d199aa&w=740"
                }
                alt="user photo"
              />
            </button>

            {/* Dropdown menu */}
            {showDashBoard && (
              <div
                ref={dropdownRef} // Ref for the dropdown menu
                className="z-50 absolute top-full right-0 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user.firstName}- {user.lastName}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="edit/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleSignOut}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
