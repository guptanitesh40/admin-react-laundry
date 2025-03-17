import React from "react";

const TableShimmer: React.FC = () => {
  return (
    <div className="container-fixed">
      <div className="mt-5">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            className="flex justify-between items-center mb-4 gap-3"
            key={index}
          >
            <div className="bg-gray-200 animate-pulse h-6 w-[340px] rounded-md"></div>
            <div className="bg-gray-200 animate-pulse h-6 w-[340px] rounded-md"></div>
            <div className="bg-gray-200 animate-pulse h-6 w-[240px] rounded-md"></div>
            <div className="bg-gray-200 animate-pulse h-6 w-[240px] rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableShimmer;
