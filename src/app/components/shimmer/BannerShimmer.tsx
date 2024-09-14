import React from 'react';

const BannerShimmer: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-5 mb-2">
        <div className="w-[60px] h-[24px] bg-gray-300 rounded"></div>
        <div className="w-[105px] h-[60px] bg-gray-300 rounded"></div>
        <div className="w-[165px] h-[24px] bg-gray-300 rounded"></div>
        <div className="w-[205px] h-[24px] bg-gray-300 rounded"></div>
        <div className="w-[150px] h-[24px] bg-gray-300 rounded"></div>
      </div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center gap-5 mb-4">
          <div className="w-[60px] h-[24px] bg-gray-300 rounded"></div>
          <div className="w-[105px] h-[60px] bg-gray-300 rounded"></div>
          <div className="w-[165px] h-[24px] bg-gray-300 rounded"></div>
          <div className="w-[205px] h-[24px] bg-gray-300 rounded"></div>
          <div className="w-[150px] h-[24px] bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default BannerShimmer;
