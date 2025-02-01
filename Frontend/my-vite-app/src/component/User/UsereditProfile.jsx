import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import Toast from "../../utils/Toast";
import { addUser } from "../../utils/store/userSlice";
const UserEditProfile = () => {
  const user = useSelector((state) => state.userReducer) || {};
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(user);
  const [sucess, setSucess] = useState("");
  const timer = useRef(null);
  const dispatch = useDispatch((state) => state.userReducer);
  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.firstName || !userData.lastName || !userData.age) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setError("");
      setSucess("");
      const resp = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          age: userData.age,
          about: userData.about,
          photoUrl: userData.photoUrl,
          gender: userData.gender,
          skills: userData.skills,
        },
        { withCredentials: true }
      );
      setSucess(resp?.data?.message);
      dispatch(addUser(resp?.data?.data));
    } catch (error) {
      console.log(error);
      setError(error?.response?.statusText || "Something went wrong");
    }
  };
  useEffect(() => {
    timer.current = setTimeout(() => {
      if (error) {
        setError("");
      }
      if (sucess) {
        setSucess("");
      }
    }, 3000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [error, sucess]);

  return (
    user && (
      <div className="flex justify-center items-center w-full min-h-screen p-2 md:p-4">
        {(error && <Toast message={error} type="error" />) ||
          (sucess && <Toast message={sucess} type="success" />)}

        <div className="flex flex-col lg:flex-row w-full max-w-6xl space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Edit Profile Form */}
          <div className="w-full lg:w-1/2 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 md:p-6 flex flex-col justify-between">
            <form
              className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg flex-grow"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 dark:text-white mb-4 md:mb-6">
                Edit Profile
              </h2>

              {/* Render form fields dynamically */}
              {[
                "firstName",
                "lastName",
                "age",
                "about",
                "gender",
                "photoUrl",
              ].map((field) => (
                <div key={field} className="mb-3 md:mb-4">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1 md:mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "age" ? "number" : "text"}
                    name={field}
                    className="w-full p-2 md:p-3 text-sm rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                    value={userData[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-2 md:py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* UserCard Section */}
          <div className="w-full lg:w-1/2 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 md:p-6 flex flex-col justify-between">
            <UserCard user={userData} />
          </div>
        </div>
      </div>
    )
  );
};

export default UserEditProfile;
