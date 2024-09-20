import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "../components/layout/Index";
import DashBoard from "../components/dashboard/Index";
import Shimmer from "../components/shimmer/Shimmer";
import ListShimmer from "../components/shimmer/ListShimmer";
import ProfileShimmer01 from "../components/shimmer/ProfileShimmer";
import ProfileShimmer02 from "../components/shimmer/ProfileShimmer01";

const PrivateRoutes: React.FC = () => {
  const Profile = lazy(() => import("../components/profile/Index"));
  const Category = lazy(() => import("../components/category/Category"));
  const Product = lazy(() => import("../components/product/Product"));
  const Service = lazy(() => import("../components/services/Service"));
  const Coupon = lazy(() => import("../components/coupon/Coupon"));
  const CouponModal = lazy(() => import("../components/coupon/CouponModal"));
  const Price = lazy(() => import("../components/price/Price"));
  const CompanyList = lazy(() => import("../components/company/CompanyList"));
  const CompanyProfile = lazy(() => import("../components/company/CompanyProfile"));
  const CompanyForm = lazy(() => import("../components/company/CompanyForm"));
  const BranchList = lazy(() => import("../components/branch/BranchList"));
  const BranchForm = lazy(() => import("../components/branch/BranchForm"))
  const BranchProfile = lazy(() => import("../components/branch/BranchProfile"))

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
          path="/coupon-modal/:id"
          element={
            <Suspense fallback={<Shimmer />}>
              <CouponModal />
            </Suspense>
          }
        />

        <Route
          path="/price"
          element={
            <Suspense fallback={<Shimmer />}>
              <Price />
            </Suspense>
          }
        />

        <Route
          path="/companies"
          element={
            <Suspense fallback={<ListShimmer />}>
              <CompanyList />
            </Suspense>
          }
        />

        <Route
          path="/company-profile/:id"
          element={
            <Suspense fallback={<ProfileShimmer01 />}>
              <CompanyProfile />
            </Suspense>
          }
        />

        <Route
          path="/company/add"
          element={
            <Suspense fallback={<Shimmer/>}>
              <CompanyForm />
            </Suspense>
          }
        />
        
        <Route
          path="/company/edit/:id"
          element={
            <Suspense fallback={<Shimmer/>}>
              <CompanyForm />
            </Suspense>
          }
        />

        <Route
          path="/branches"
          element={
            <Suspense fallback={<ListShimmer />}>
              <BranchList />
            </Suspense>
          }
        />

        <Route
          path="/branch/add"
          element={
            <Suspense fallback={<Shimmer/>}>
              <BranchForm />
            </Suspense>
          }
        />
        <Route
          path="/branch/edit/:id"
          element={
            <Suspense fallback={<Shimmer/>}>
              <BranchForm />
            </Suspense>
          }
        />
        <Route
          path="/branch-profile/:id"
          element={
            <Suspense fallback={<ProfileShimmer02 />}>
              <BranchProfile />
            </Suspense>
          }
        />

        <Route
          path="/profile"
          element={
            <Suspense fallback={<Shimmer />}>
              <Profile />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export {PrivateRoutes};
