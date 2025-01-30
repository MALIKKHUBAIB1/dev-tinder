import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserEditProfile = () => {
  const user = useSelector((state) => state.userReducer) || {};
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    photoUrl: "",
    gender: "",
    about: "",
  });

  // Update state when user changes
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        photoUrl: user.photoUrl || "",
        gender: user.gender || "",
        about: user.about || "",
      });
    }
  }, [user]);

  function handleChangeInput(value, type) {
    setProfile((prev) => ({
      ...prev,
      [type]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(profile);
  }

  return (
    user && (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800">
        <form
          className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg max-w-lg w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
            Edit Profile
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              First Name
            </label>
            <input
              type="text"
              className="w-full p-3 text-sm rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
              required
              value={profile.firstName}
              onChange={(e) => handleChangeInput(e.target.value, "firstName")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="w-full p-3 text-sm rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
              required
              value={profile.lastName}
              onChange={(e) => handleChangeInput(e.target.value, "lastName")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Age
            </label>
            <input
              type="number"
              className="w-full p-3 text-sm rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="24"
              required
              value={profile.age}
              onChange={(e) => handleChangeInput(e.target.value, "age")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              About
            </label>
            <input
              type="text"
              className="w-full p-3 text-sm rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write something about yourself"
              required
              value={profile.about}
              onChange={(e) => handleChangeInput(e.target.value, "about")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Gender
            </label>
            <input
              type="text"
              className="w-full p-3 text-sm rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Male/Female"
              required
              value={profile.gender}
              onChange={(e) => handleChangeInput(e.target.value, "gender")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Photo URL
            </label>
            <input
              type="text"
              className="w-full p-3 text-sm rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={profile.photoUrl}
              onChange={(e) => handleChangeInput(e.target.value, "photoUrl")}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    )
  );
};

export default UserEditProfile;
