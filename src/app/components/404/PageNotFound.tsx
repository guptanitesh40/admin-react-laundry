import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 z-[999]">
      <div className="flex flex-col items-center justify-center grow h-[95%] lgscreen:px-2">
        <div className="mb-10">
          <img src="/media/404/404.svg" alt="404 image" className="max-h-[160px]" />
        </div>
        <span className="badge badge-primary badge-outline mb-3">
          404 Error
        </span>
        <h3 className="text-2.5xl font-semibold text-gray-900 text-center mb-2">
          We have lost this page
        </h3>
        <div className="text-md text-center text-gray-700 mb-10">
          The requested page is missing. Check the URL or{" "}
          <a
            href="/"
            className="text-primary font-medium hover:text-primary-active"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
