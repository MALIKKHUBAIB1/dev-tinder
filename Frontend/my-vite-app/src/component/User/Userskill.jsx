import React from "react";

function Userskill({ skills }) {
  return (
    <>
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
    </>
  );
}

export default Userskill;
