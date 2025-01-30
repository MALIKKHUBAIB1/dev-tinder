import React from "react";

function UserCard({ user }) {
  const { firstName, lastName, age, photoUrl, skills, about } = user;

  return (
    <div className="w-full sm:w-[450px] md:w-[500px] lg:w-[550px] bg-white border border-gray-300 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center overflow-hidden">
      {/* Image */}
      <div className="w-full">
        <img
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
          src={photoUrl || "https://via.placeholder.com/550x350"}
          alt={`${firstName} ${lastName}`}
        />
      </div>

      {/* Content */}
      <div className="p-8 text-center">
        {/* Name */}
        <h5 className="mb-2 text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          {firstName} {lastName}
        </h5>

        {/* Age */}
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-3">
          {age} years old
        </p>

        {/* About */}
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-4">
          {about}
        </p>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h6 className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2">
              Skills:
            </h6>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm md:text-base bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons Section */}
        <div className="flex justify-center gap-4 mt-4">
          {/* Accept Button */}
          <button className="px-6 py-3 text-base md:text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 transition">
            Accept
          </button>

          {/* Reject Button */}
          <button className="px-6 py-3 text-base md:text-lg font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 transition">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
