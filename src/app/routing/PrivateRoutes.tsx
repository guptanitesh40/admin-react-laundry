import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import DashBoard from '../components/dashboard/DashBoard';

const PrivateRoutes: React.FC = () => {

  const Profile = lazy(() => import('../components/profile/Profile'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='/dashboard' element={<DashBoard />} />
        {/* <Route path='*' element={<Navigate to='/dashboard' />} /> */}

        <Route 
          path='/profile' 
          element={
            <Suspense fallback={<h1 style={{"margin":"100px"}}>Loading...</h1>}>
              <Profile/>
            </Suspense>
            }
        />
        
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
