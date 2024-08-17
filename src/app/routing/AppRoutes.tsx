import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import App from "../../App";
import { ForgotPassword } from "../pages/ForgotPassword";


const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return (
    <BrowserRouter >
    <Routes>
      <Route element={<App />}>
        {isAuthenticated ? (
          <>
            <Route path="/*" element={<PrivateRoutes />} />
            <Route index element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Route>
    </Routes>
    </BrowserRouter>

  );
};

export { AppRoutes };
