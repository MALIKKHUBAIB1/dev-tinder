import React from "react";
import ConnectionSkill from "./ConnectionSkill";

function ConnectionList({ connection }) {
  const { firstName, lastName, age, about, photoUrl, skills } = connection;
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden p-6 mb-6 flex flex-col md:flex-row items-center md:items-start">
      {/* Left Side - Image */}
      <img
        src={photoUrl || "https://via.placeholder.com/150"}
        alt={firstName}
        className="h-40 w-40 md:h-60 md:w-60 object-cover rounded-3xl border-2"
      />

      {/* Right Side - Text */}
      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col text-center md:text-left">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-500 text-sm dark:text-gray-300">
          {age} years old
        </p>
        <p className="text-gray-600 mt-2 dark:text-gray-400">{about}</p>

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
      </div>
    </div>
  );
}

export default ConnectionList;
