import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/Index";
import { Header } from "../header/Index";
import { Footer } from "../footer/Index";

const MasterLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex grow overflow-auto">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="wrapper flex grow flex-col">
        <Header setIsOpen={setIsOpen} />
        <main className="grow content pt-4" id="content" role="content">
          <div className="d-flex flex-column flex-column-fluid h-full">
            <Outlet />
          </div>
          <div className="container-fixed"></div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MasterLayout;
