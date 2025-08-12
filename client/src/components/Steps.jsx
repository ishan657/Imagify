import React from "react";
import { stepsData } from "../assets/assets";

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center my-32">
      <h1 className="text-4xl sm:text-5x1 font-semibold mb-2 ">How it works</h1>
      <p className="text-lg text-gray-600 mb-8">
        Transform Words Into Stunning Images
      </p>
      <div className="space-y-4 w-full max-w-3x1 text-sm">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-auto gap-4 p-5 px-8 bg-white shadow-md border-0 cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
          >
            <img src={item.icon} width={40} alt="" />
            <div className="">
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="text-grey-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
