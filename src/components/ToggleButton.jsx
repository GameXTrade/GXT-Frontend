import React, { useState } from "react";

export default function ToggleButton({ onToggle }) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <div
      className="relative bg-gray-50 w-52 h-11 rounded-xl cursor-pointer select-none"
      onClick={toggleActive}
    >
      <div className="flex items-center justify-between h-full px-2">
        <div
          className={`flex-1 text-center z-10 ${
            isActive ? "text-gray-500" : "text-black"
          }`}
        >
          Trending
        </div>
        <div
          className={`flex-1 text-center z-10 ${
            isActive ? "text-black" : "text-gray-500"
          }`}
        >
          Top
        </div>
      </div>
      <div
        className={`absolute top-0 bottom-0 w-[calc(50%-4px)] bg-white rounded-xl transition-transform duration-300 m-1 shadow-md ${
          isActive ? "translate-x-[100%]" : ""
        }`}
      ></div>
    </div>
  );
}
