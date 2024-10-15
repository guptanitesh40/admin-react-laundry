import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "../components/layout/Index";
import DashBoard from "../components/dashboard/Index";
import Shimmer from "../components/shimmer/Shimmer";
import ListShimmer from "../components/shimmer/ListShimmer";
import ProfileShimmer01 from "../components/shimmer/ProfileShimmer";
import ProfileShimmer02 from "../components/shimmer/ProfileShimmer01";
import Banner from "../components/banner/Banner";
import BannerShimmer from "../components/shimmer/BannerShimmer";
import Category from "../components/category/Category";

const PrivateRoutes: React.FC = () => {
  const Profile = lazy(() => import("../components/profile/Index"));
  const Product = lazy(() => import("../components/product/Product"));
  const Service = lazy(() => import("../components/services/Service"));
  const Coupon = lazy(() => import("../components/coupon/Coupon"));
  const CouponModal = lazy(() => import("../components/coupon/CouponModal"));
  const Price = lazy(() => import("../components/price/Price"));
  const Company = lazy(() => import("../components/company/Company"));
  const CompanyProfile = lazy(() => import("../components/company/CompanyProfile"));
  const CompanyForm = lazy(() => import("../components/company/CompanyForm"));
  const Branch = lazy(() => import("../components/branch/Branch"));
  const BranchForm = lazy(() => import("../components/branch/BranchForm"));
  const BranchProfile = lazy(() => import("../components/branch/BranchProfile"));
  const Order = lazy(() => import("../components/order/Order"));
  const OrderForm = lazy(() => import("../components/order/OrderForm"));
  const OrderDetail = lazy(() => import("../components/order/OrderDetail"));
  const User = lazy(() => import("../components/user/User"))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />

        <Route
          path="/category"
          element={
            
              <Category />
           
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
            <Suspense fallback={<Shimmer/>}>
              <CouponModal/>
            </Suspense>
          }
        />

        <Route
          path="/coupon/edit/:id"
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
              <Company />
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
              <Branch />
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
          path="/banner"
          element={
            <Suspense fallback={<BannerShimmer />}>
              <Banner/>
            </Suspense>
          }
        />

        <Route
          path="/orders"
          element={
            <Suspense fallback={<ListShimmer />}>
              <Order />
            </Suspense>
          }
        />

        <Route 
          path="/order/add"
          element={
            <Suspense fallback={<ListShimmer />}>
              <OrderForm />
            </Suspense>
          }
        />

        <Route
          path="/order/edit/:id"
          element={
            <Suspense fallback={<Shimmer/>}>
              <OrderForm />
            </Suspense>
          }
        />

        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<Shimmer/>}>
              <OrderDetail />
            </Suspense>
          }
        />

      <Route
          path="/user"
          element={
            <Suspense fallback={<ListShimmer />}>
              <User/>
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
