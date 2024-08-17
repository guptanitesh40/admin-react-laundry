import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";


const MasterLayout: React.FC = () => {
  return (
    <div className="flex grow">
      <Sidebar />
      <div className="wrapper flex grow flex-col">
        <Header />
        <main className="grow content pt-5" id="content" role="content">
          <div className="container-fixed" id="content_container">
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
