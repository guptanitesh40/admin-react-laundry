import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./app/pages/DashBoard";
import Signin from "./app/pages/Signin";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route 
        path="/signin" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signin />} 
      />
      
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <DashBoard /> : <Navigate to="/signin" replace />} 
      />
      
      <Route 
        path="*" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />} 
      />
    </Routes>
  );
};

export default App;
