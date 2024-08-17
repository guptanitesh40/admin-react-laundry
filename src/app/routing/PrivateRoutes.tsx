import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import DashBoard from '../components/dashboard/DashBoard';
import Profile from '../components/dashboard/Profile';

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='*' element={<Navigate to='/dashboard' />} />
        <Route path='/profile' element={<Profile/>}></Route>
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
