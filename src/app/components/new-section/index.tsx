import React from "react";

const index: React.FC = () => {
  return (
    <main className="grow content" id="content" role="content">
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              New Section
            </h1>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-center text-md text-gray-700 font-bold">
            Hello world
          </h2>
        </div>
      </div>
    </main>
  );
};

export default index;
