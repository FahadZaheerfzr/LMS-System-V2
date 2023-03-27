import React from "react";

export default function Wizard({ active, setActive, items }) {
  return (
    <div className=" font-cabin flex justify-between items-center border-b border-primary-black border-opacity-20 w-full max-w-[850px] ">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`w-full flex py-6 mr-5 gap-x-2 cursor-pointer ${
            active === item.id ? "border-b-[3px]  border-[#FEC703]" : ""
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              active === item.id
                ? "bg-blue-800"
                : "border border-primary-black border-opacity-30"
            }`}
          >
            <span
              className={`font-bold text-sm ${
                active === item.id ? "text-white" : "text-primary-black"
              }`}
            >
              {item.id}
            </span>
          </div>

          <span className={`font-medium text-primary-black`}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
