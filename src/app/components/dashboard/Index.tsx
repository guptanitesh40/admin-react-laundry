import React from "react";

const DashBoard: React.FC = () => {
  return (
    <>
    <div>
     <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
      <div className="flex flex-col justify-center gap-2">
       <h1 className="text-xl font-semibold leading-none text-gray-900">
        Dashboard
       </h1>
       <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        Central Hub for Personal Customization
       </div>
      </div>
     
     </div>
    </div>

    </>
  );
};

export default DashBoard;
