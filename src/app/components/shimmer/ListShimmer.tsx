import React from "react";

const ListShimmer: React.FC = () => {
  return (
    <div className="container-fixed">
      {/* Header Shimmer */}
      <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
        <div className="flex flex-col gap-2">
          <div className="bg-gray-200 animate-pulse h-6 w-48 rounded-md mb-2"></div>
          <div className="bg-gray-200 animate-pulse h-4 w-32 rounded-md"></div>
        </div>
        <div className="bg-gray-200 animate-pulse h-10 w-32 rounded-md"></div>
      </div>

      {/* Table Shimmer */}
      <div className="grid gap-5 lg:gap-4.5">
        <div className="card card-grid min-w-full">
          <div className="card-body">
            {/* Table Header Shimmer */}
            <div className="flex justify-between">
              <div className="bg-gray-200 animate-pulse h-4 w-[60px] rounded-md"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-[200px] rounded-md"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-[240px] rounded-md"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-[50px] rounded-md"></div>
            </div>

            {/* Table Rows Shimmer */}
            <div className="mt-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex justify-between items-center mb-4" key={index}>
                  <div className="bg-gray-200 animate-pulse h-4 w-[60px] rounded-md"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-[200px] rounded-md"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-[240px] rounded-md"></div>
                  <div className="bg-gray-200 animate-pulse h-8 w-[50px] rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListShimmer;
