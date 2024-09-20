import React from 'react';

const ProfileShimmer01 = () => {
  return (
    <div className="container-fixed">
      <div className="card bg-gray-200 animate-pulse">
        <div className="card-header p-4">
          <h3 className="card-title w-1/3 h-6 bg-gray-300 rounded-md"></h3>
        </div>
        <div className="card-body pt-3.5 pb-3.5">
          <table className="table-auto w-full">
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10 w-1/3">
                    <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                  </td>
                  <td className="text-sm font-medium text-gray-800 pb-3 w-2/3">
                    <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmer01;
