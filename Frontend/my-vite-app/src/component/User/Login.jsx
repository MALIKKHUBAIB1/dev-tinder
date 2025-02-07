import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Error from "../../utils/Error";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/store/userSlice";
import { useLocation, useNavigate } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState("malik786@gmail.com");
  const [password, setPassword] = useState("Malik@1234");
  const [loginError, setLoginError] = useState("");
  const user = useSelector((state) => state.userReducer);
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const timer = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Fields can't be empty.");
      return;
    }
    try {
      // Clear previous error and status
      setLoginError("");
      setStatus(null);
      const resp = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (!resp) {
        setLoginError("Something went wrong");
        return;
      }
      dispatch(addUser(resp?.data.data));
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      // Handle error with proper checks
      setLoginError(err.response?.data || "An error occurred.");
      setStatus(err.response?.status || 500);
    }
  };

  useEffect(() => {
    if (loginError) {
      timer.current = setTimeout(() => {
        setLoginError("");
      }, 3000);
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [loginError]);

  useEffect(() => {
    if (location.pathname === "/login" && user) {
      navigate("/");
    }
  }, [user, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      {/* Display error message above the form */}
      <form
        className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg max-w-lg w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
          Login
        </h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 text-sm rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name@domain.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 text-sm rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {loginError ? (
          <Error message={loginError} status={status} />
        ) : (
          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        )}
        <p
          className="cursor-pointer text-center my-4 text-xl"
          onClick={() => navigate("/signup")}
        >
          sing Up
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
