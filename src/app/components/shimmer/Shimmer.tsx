import React from "react";

const Shimmer: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex justify-between">
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-300 rounded"></div>
      </div>

      <div className="w-full border-t border-gray-300 mt-2">
        <div className="flex py-2">
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-6 bg-gray-300 rounded ml-auto"></div>
        </div>

        <div className="space-y-2">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="flex py-3 border-t border-gray-200"
              >
                <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
                <div className="w-1/4 h-6 bg-gray-200 rounded ml-auto"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
