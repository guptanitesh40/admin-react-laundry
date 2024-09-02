import React, { lazy, Suspense } from "react";
import {  Route, Routes } from "react-router-dom";
import MasterLayout from "../components/layout/Index";
import DashBoard from "../components/dashboard/Index";
import Shimmer from "../components/shimmer";

const PrivateRoutes: React.FC = () => {
  const Profile = lazy(() => import("../components/profile/Index"));
  const Category = lazy(() => import("../components/category/Category"));
  const Product = lazy(() => import("../components/product/Product"));
  const Service = lazy(() => import("../components/services/Service"));
  const Coupon = lazy(() => import("../components/coupon/Coupon"));
  const CouponModal = lazy(() => import("../components/coupon/CouponModal"));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />

        <Route
          path="/category"
          element={
            <Suspense fallback={<Shimmer />}>
              <Category />
            </Suspense>
          }
        />

        <Route
          path="/product"
          element={
            <Suspense fallback={<Shimmer />}>
              <Product />
            </Suspense>
          }
        />

        <Route
          path="/services"
          element={
            <Suspense fallback={<Shimmer />}>
              <Service />
            </Suspense>
          }
        />

        <Route
          path="/coupon"
          element={
            <Suspense fallback={<Shimmer />}>
              <Coupon />
            </Suspense>
          }
        />
        
        <Route
          path="/coupon/add"
          element={
            <Suspense fallback={<Shimmer />}>
              <CouponModal />
            </Suspense>
          }
        />

        <Route
          path="/profile"
          element={
            <Suspense
              fallback={<h1 style={{ margin: "100px" }}>Loading...</h1>}
            >
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <h2 style={{ margin: "100px" }}>
              Page Not Found. Please navigate to a valid page.
            </h2>
          }
        />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
