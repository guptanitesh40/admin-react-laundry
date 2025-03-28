import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import KTComponent from "./metronic/core/index";
import KTLayout from "./metronic/app/layouts/demo1";

const App: React.FC = () => {
  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export default App;
