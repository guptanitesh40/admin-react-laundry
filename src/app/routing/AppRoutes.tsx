import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import { PrivateRoutes } from './PrivateRoutes';
import App from '../../App';


const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route element={<App />}>
        {isAuthenticated ? (
          <>
            <Route path="/*" element={<PrivateRoutes />} />
            <Route index element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export { AppRoutes };
