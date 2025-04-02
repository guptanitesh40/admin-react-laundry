import React from "react";

const rows: number = 15;
const columns: number = 10;

const TableShimmer: React.FC = () => {
  return (
    <tbody>
      {Array.from({ length: columns }).map((_, keyNum) => {
        return (
          <tr key={keyNum}>
            {Array.from({ length: rows }).map((_, index) => {
              return (
                <td key={index} className="!m-0 !p-2">
                  <span className="inline-block w-full h-6 bg-gray-200 animate-pulse rounded-md p-4"></span>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
  // <div className="container-fixed">
  //   <div className="mt-5">
  //     {Array.from({ length: 15 }).map((_, index) => (
  //       <div
  //         className="flex justify-between items-center mb-4 gap-3"
  //         key={index}
  //       >
  //         <div className="bg-gray-200 animate-pulse h-6 w-[340px] rounded-md"></div>
  //         <div className="bg-gray-200 animate-pulse h-6 w-[340px] rounded-md"></div>
  //         <div className="bg-gray-200 animate-pulse h-6 w-[240px] rounded-md"></div>
  //         <div className="bg-gray-200 animate-pulse h-6 w-[240px] rounded-md"></div>
  //       </div>
  //     ))}
  //   </div>
  // </div>
};

export default TableShimmer;
