import React from "react";

const ModelLoadingTag: React.FC = () => {
  return (
    <div className="bg-white/5 absolute h-full w-full top-0 right-0 flex justify-center items-center z-20 background-filter-blue rounded-lg">
      <span className="flex justify-center items-center gap-2 bg-black/50 px-3 py-2 rounded-[4px]">
        <span className="inline-block h-6 w-6 rounded-full border-4 border-white/20 !border-t-white animate-spin"></span>
        <span className="text-white font-semibold">Loading...</span>
      </span>
    </div>
  );
};

export default ModelLoadingTag;
