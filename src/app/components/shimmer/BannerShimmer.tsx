import React from "react";

const BannerShimmer: React.FC = () => {
  return (
    <div className="animate-pulse grid gap-5 lg:gap-7.5">

      <div className="flex flex-wrap items-center lg:items-end justify-between gap-5">
        <div className="flex flex-col justify-center gap-2">
          <div className="h-8 w-32 bg-gray-200 rounded"></div> 
        </div>
        <div className="h-10 w-40 bg-gray-200 rounded"></div>
      </div>

      <div className="card card-grid min-w-full">
        <div className="card-body">
          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th className="w-[60px]">ID</th>
                  <th className="min-w-[200px]">Image</th>
                  <th className="min-w-[165px]">Title</th>
                  <th className="min-w-[205px]">Description</th>
                  <th className="w-[125px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <div className="h-6 w-[60px] bg-gray-200 rounded"></div>
                    </td>
                    <td>
                      <div className="h-[80px] w-[80px] bg-gray-200 rounded-lg"></div>
                    </td>
                    <td>
                      <div className="h-6 w-[165px] bg-gray-200 rounded"></div>
                    </td>
                    <td>
                      <div className="h-6 w-[205px] bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 w-[180px] bg-gray-200 rounded"></div>
                    </td>
                    <td className="flex gap-2">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerShimmer;
