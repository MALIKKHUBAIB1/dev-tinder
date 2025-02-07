import React from "react";
import ConnectionSkill from "./ConnectionSkill";

function ConnectionList({ connection, comp }) {
  const { firstName, lastName, age, about, photoUrl, skills } = connection;
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Left Side - Image */}
      <img
        src={photoUrl || "https://via.placeholder.com/150"}
        alt={`${firstName} ${lastName}`}
        className="h-40 w-40 md:h-60 md:w-60 object-cover rounded-3xl border-2"
      />

      {/* Right Side - Text */}
      <div className="flex flex-col flex-1 text-center md:text-left">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-500 text-sm dark:text-gray-300">
          {age} years old
        </p>
        <p className="text-gray-600 mt-2 dark:text-gray-400">{about}</p>

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Skills:
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              {skills.map((skill, index) => (
                <ConnectionSkill skill={skill} key={index} />
              ))}
            </div>
          </div>
        )}
        {comp && (
          <div className="flex gap-4 mt-4 md:mt-0 md:self-start">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition my-7">
              Accept
            </button>
            <button className="my-7 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Ignore
            </button>
          </div>
        )}
      </div>

      {/* Buttons - Positioned Correctly */}
    </div>
  );
}

export default ConnectionList;
