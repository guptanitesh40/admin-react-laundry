import React from "react";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fixed">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
          <div className="flex order-2 md:order-1 gap-2 font-normal text-2sm">
            {/* <span className="text-gray-500">{year}©</span> */}
            {/* <a className="text-gray-600 hover:text-primary">Sikka Cleaners.</a> */}
          </div>
          {/* <nav className="flex order-1 md:order-2 gap-4 font-normal text-2sm text-gray-600">
            <a className="hover:text-primary">Docs</a>
            <a className="hover:text-primary">Purchase</a>
            <a className="hover:text-primary">FAQ</a>
            <a className="hover:text-primary">Support</a>
            <a className="hover:text-primary">License</a>
          </nav> */}
        </div>
      </div>
    </footer>
  );
};
