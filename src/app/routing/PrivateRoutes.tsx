import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MasterLayout from '../components/layout/Index';
import DashBoard from '../components/dashboard/Index';

const PrivateRoutes: React.FC = () => {

  const Profile = lazy(() => import('../components/profile/Index'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='/dashboard' element={<DashBoard />} />

        <Route 
          path='/profile' 
          element={
            <Suspense fallback={<h1 style={{"margin":"100px"}}>Loading...</h1>}>
              <Profile/>
            </Suspense>
            }
        />
        <Route path="*" element={<h2 style={{ margin: '100px' }}>Page Not Found. Please navigate to a valid page.</h2>} />

      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
