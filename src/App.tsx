import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./app/pages/DashBoard";
import { useSelector } from "react-redux";
import Login from "./app/pages/Login";

const App = () => {
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <DashBoard /> : <Navigate to="/login" replace />} 
      />
      
      <Route 
        path="*" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  );
};

export default App;
