import React from "react";

interface ShimmerEd2Prop {
  isFilters?: boolean;
  isPagination?: boolean;
  columns: number;
  records: number;
}

const ShimmerEd2: React.FC<ShimmerEd2Prop> = ({
  isFilters = false,
  isPagination = false,
  columns = 3,
  records = 10,
}) => {
  return (
    <>
      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            {isFilters && (
              <div className="card-header card-header-space flex-wrap">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block w-10 h-6 bg-gray-200 animate-pulse rounded-md"></span>
                  <span className="inline-block w-16 h-8 bg-gray-200 animate-pulse rounded-md"></span>
                  <span className="inline-block w-16 h-6 bg-gray-200 animate-pulse rounded-md"></span>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-2 mb-3">
                  <span className="inline-block w-44 h-10 bg-gray-200 animate-pulse rounded-md"></span>
                  <span className="inline-block w-44 h-10 bg-gray-200 animate-pulse rounded-md"></span>
                  <span className="inline-block w-44 h-10 bg-gray-200 animate-pulse rounded-md"></span>
                </div>
              </div>
            )}
            <div className="card-body">
              <div className="scrollable-x-auto">
                <table className="table table-auto table-border">
                  <thead>
                    <tr>
                      {Array.from({ length: columns }).map((_, index) => {
                        return (
                          <th key={index} className="min-w-[250px]">
                            <span className="inline-block h-7 w-full bg-gray-200 rounded-md animate-pulse"></span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: records }).map((_, ind) => {
                      return (
                        <tr key={ind}>
                          {Array.from({ length: columns }).map((_, index) => {
                            return (
                              <td key={index}>
                                <span className="inline-block h-8 w-full bg-gray-200 rounded-md animate-pulse"></span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {isPagination && (
                  <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                      <span className="inline-block h-5 w-40 bg-gray-200 rounded-md animate-pulse"></span>
                      <div className="pagination flex flex-wrap">
                        {Array.from({ length: 6 }).map((_, index) => {
                          return (
                            <span
                              key={index}
                              className="btn btn-light disabled !bg-gray-200 animate-pulse"
                            >
                              &nbsp;
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShimmerEd2;
