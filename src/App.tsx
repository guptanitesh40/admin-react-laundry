import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import KTComponent from "./metronic/core/"; 
import KTLayout from "./metronic/app/layouts/demo1"; 
import Login from './app/pages/Login';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isAuthenticated ? <Outlet /> : <Login/>}
    </Suspense>
  );
};

export default App;
