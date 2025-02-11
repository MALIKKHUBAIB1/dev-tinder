import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../../utils/store/userSlice";
import Toast from "../../utils/Toast";
import { BASE_URL } from "../../utils/const";

function Signup() {
  const [success, setSucess] = useState("");
  const [error, setError] = useState("");
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    password: "",
    email: "",
    skills: [], // Array to store selected skills
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "skills") {
      const { value, checked } = e.target;
      setFormData((prevData) => {
        const updatedSkills = checked
          ? [...prevData.skills, value] // Add skill to the array
          : prevData.skills.filter((skill) => skill !== value); // Remove skill from the array
        return { ...prevData, skills: updatedSkills };
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.age ||
      !formData.password ||
      !formData.email ||
      !formData.gender ||
      !formData.skills.length
    ) {
      // alert("field can not be empty ");
      setError("can't be empty ");
      return;
    }
    try {
      setError("");
      const resp = await axios.post(BASE_URL + "signup", {
        formData,
      });
      if (!resp.data) {
        return;
      }
      setSucess(resp?.data?.message);
      dispatch(addUser(resp?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
    }
  }
  useEffect(() => {
    if (error) {
      ref.current = setTimeout(() => {
        setError("");
      }, 3000);
    }
    if (success) {
      ref.current = setTimeout(() => {
        setSucess("");
      }, 3000);
    }
    return () => clearTimeout(ref.current);
  }, [error, success]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-800">
      {success ||
        (error && (
          <Toast
            type={error ? "error" : "success"}
            message={error ? error : success}
          />
        ))}
      <div className="w-full sm:w-96 p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-3xl text-center font-semibold text-gray-900 dark:text-white mb-6">
          User Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label
              className="block text-gray-700 dark:text-white text-sm font-medium mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              className="block text-gray-700 dark:text-white text-sm font-medium mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg"
              placeholder="Enter last name"
            />
          </div>

          {/* Age */}
          <div>
            <label
              className="block text-gray-700 dark:text-white text-sm font-medium mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg"
              placeholder="Enter your age"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              className="block text-gray-700 dark:text-white text-sm font-medium mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-gray-700 dark:text-white text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-gray-700 dark:text-white text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          {/* Skills (Checkboxes) */}
          <div>
            <label
              className="block text-gray-700 dark:text-white text-sm font-medium mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <div className="space-y-2">
              <div>
                <input
                  type="checkbox"
                  id="developer"
                  name="skills"
                  value="developer"
                  checked={formData.skills.includes("developer")}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label
                  className="text-sm text-gray-700 dark:text-white"
                  htmlFor="developer"
                >
                  Developer
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="data-science"
                  name="skills"
                  value="data science"
                  checked={formData.skills.includes("data science")}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label
                  className="text-sm text-gray-700 dark:text-white"
                  htmlFor="data-science"
                >
                  Data Science
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="network-engineer"
                  name="skills"
                  value="network engineer"
                  checked={formData.skills.includes("network engineer")}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label
                  className="text-sm text-gray-700 dark:text-white"
                  htmlFor="network-engineer"
                >
                  Network Engineer
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              Submit
            </button>
            <p
              className="cursor-pointer text-center my-4 text-xl"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
