import React from "react";

const ProfileShimmer02: React.FC = () => {
  return (
    <div className="animate-pulse">
     
      <div className="bg-light py-4 lg:py-10">
        <div className="container-fixed flex flex-col items-center gap-2 lg:gap-3.5">
         
          <div className="flex items-center justify-center rounded-full border-2 border-success-clarity bg-gray-200 h-[100px] w-[100px]"></div>
          
          <div className="h-6 w-40 bg-gray-200 rounded-md"></div>
          
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
            <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-5 w-28 bg-gray-200 rounded-md"></div>
            <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="container-fixed grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
        <div className="bg-gray-200 p-5 rounded-lg h-[300px]"></div>

        <div className="bg-gray-200 p-5 rounded-lg h-[300px]"></div>

        <div className="bg-gray-200 p-5 rounded-lg h-[300px]"></div>
      </div>
    </div>
  );
};

export default ProfileShimmer02;
