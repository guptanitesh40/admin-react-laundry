import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "../components/layout/Index";
import DashBoard from "../components/dashboard/Index";
import Shimmer from "../components/shimmer/Shimmer";
import ListShimmer from "../components/shimmer/ListShimmer";
import ProfileShimmer01 from "../components/shimmer/ProfileShimmer";
import ProfileShimmer02 from "../components/shimmer/ProfileShimmer01";
import { useGetUserPermissions, useValidateToken } from "../hooks";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../utils/authSlice";
import toast from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoutes";
import ContactRequest from "../components/contact-request/ContactRequest";

const PrivateRoutes: React.FC = () => {
  const Category = lazy(() => import("../components/category/Category"));
  const Profile = lazy(() => import("../components/profile/Index"));
  const Product = lazy(() => import("../components/product/Product"));
  const Service = lazy(() => import("../components/services/Service"));
  const Coupon = lazy(() => import("../components/coupon/Coupon"));
  const CouponModal = lazy(() => import("../components/coupon/CouponModal"));
  const Price = lazy(() => import("../components/price/Price"));
  const Company = lazy(() => import("../components/company/Company"));
  const CompanyProfile = lazy(
    () => import("../components/company/CompanyProfile")
  );
  const CompanyForm = lazy(() => import("../components/company/CompanyForm"));
  const Branch = lazy(() => import("../components/branch/Branch"));
  const BranchForm = lazy(() => import("../components/branch/BranchForm"));
  const BranchProfile = lazy(
    () => import("../components/branch/BranchProfile")
  );
  const Banner = lazy(() => import("../components/banner/Banner"));
  const Order = lazy(() => import("../components/order/Order"));
  const OrderForm = lazy(() => import("../components/order/OrderForm"));
  const OrderDetail = lazy(() => import("../components/order/OrderDetail"));
  const User = lazy(() => import("../components/user/User"));
  const UserForm = lazy(() => import("../components/user/UserForm"));
  const Workshop = lazy(() => import("../components/workshop/Workshop"));
  const WorkshopOrder = lazy(
    () => import("../components/workshop-order/WorkshopOrder")
  );
  const PriceContent = lazy(
    () => import("../components/price-content/PriceContent")
  );
  const UserProfile = lazy(() => import("../components/user/UserProfile"));
  const Settings = lazy(() => import("../components/settings/Settings"));
  const Payments = lazy(() => import("../components/payments/Payments"));
  const Feedback = lazy(() => import("../components/feedback/Feedback"));
  const Customer = lazy(() => import("../components/user/Customer"));
  const BookingOrder = lazy(
    () => import("../components/order/BookingOrder/BookingOrder")
  );
  const PickupOrder = lazy(
    () => import("../components/order/PickupOrder/PickupOrder")
  );
  const DeliveredOrderTable = lazy(
    () => import("../components/order/DeliveredOrder/DeliveredOrder")
  );
  const Roles = lazy(() => import("../components/roles-permissions/Roles"));
  const Permissions = lazy(
    () => import("../components/roles-permissions/Permissions")
  );

  const { loading } = useValidateToken();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>{" "}
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />

        <Route element={<ProtectedRoute moduleId={5} action="read" />}>
          <Route
            path="/category"
            element={
              <Suspense fallback={<Shimmer />}>
                <Category />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={6} action="read" />}>
          <Route
            path="/product"
            element={
              <Suspense fallback={<Shimmer />}>
                <Product />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={7} action="read" />}>
          <Route
            path="/services"
            element={
              <Suspense fallback={<Shimmer />}>
                <Service />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={9} action="read" />}>
          <Route
            path="/coupon"
            element={
              <Suspense fallback={<Shimmer />}>
                <Coupon />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={9} action="create" />}>
          <Route
            path="/coupon/add"
            element={
              <Suspense fallback={<Shimmer />}>
                <CouponModal />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={9} action="update" />}>
          <Route
            path="/coupon/edit/:id"
            element={
              <Suspense fallback={<Shimmer />}>
                <CouponModal />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={10} action="read" />}>
          <Route
            path="/price"
            element={
              <Suspense fallback={<Shimmer />}>
                <Price />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={11} action="read" />}>
          <Route
            path="/price-content"
            element={
              <Suspense fallback={<Shimmer />}>
                <PriceContent />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={12} action="read" />}>
          <Route
            path="/companies"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Company />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={12} action="read" />}>
          <Route
            path="/company-profile/:id"
            element={
              <Suspense fallback={<ProfileShimmer01 />}>
                <CompanyProfile />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={12} action="create" />}>
          <Route
            path="/company/add"
            element={
              <Suspense fallback={<Shimmer />}>
                <CompanyForm />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={12} action="update" />}>
          <Route
            path="/company/edit/:id"
            element={
              <Suspense fallback={<Shimmer />}>
                <CompanyForm />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={13} action="read" />}>
          <Route
            path="/branches"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Branch />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={13} action="create" />}>
          <Route
            path="/branch/add"
            element={
              <Suspense fallback={<Shimmer />}>
                <BranchForm />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={13} action="update" />}>
          <Route
            path="/branch/edit/:id"
            element={
              <Suspense fallback={<Shimmer />}>
                <BranchForm />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={13} action="read" />}>
          <Route
            path="/branch-profile/:id"
            element={
              <Suspense fallback={<ProfileShimmer02 />}>
                <BranchProfile />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={14} action="read" />}>
          <Route
            path="/banner"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Banner />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={2} action="read" />}>
          <Route
            path="/settings"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Settings />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={3} action="read" />}>
          <Route
            path="/orders"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Order />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={3} action="read" />}>
          <Route
            path="/pickup-orders"
            element={
              <Suspense fallback={<ListShimmer />}>
                <PickupOrder />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={3} action="read" />}>
          <Route
            path="/delivered-orders"
            element={
              <Suspense fallback={<ListShimmer />}>
                <DeliveredOrderTable />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={3} action="read" />}>
          <Route
            path="/booking-orders"
            element={
              <Suspense fallback={<ListShimmer />}>
                <BookingOrder />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={4} action="read" />}>
          <Route
            path="/payments"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Payments />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={3} action="create" />}>
          <Route
            path="/order/add"
            element={
              <Suspense fallback={<ListShimmer />}>
                <OrderForm />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={3} action="update" />}>
          <Route
            path="/order/edit/:id"
            element={
              <Suspense fallback={<Shimmer />}>
                <OrderForm />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/users"
          element={
            <Suspense fallback={<ListShimmer />}>
              <User />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute moduleIds={[3, 16]} action="read" />}>
          <Route
            path="/order/:id"
            element={
              <Suspense fallback={<Shimmer />}>
                <OrderDetail />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/roles"
          element={
            <Suspense fallback={<ListShimmer />}>
              <Roles />
            </Suspense>
          }
        />

        <Route
          path="/user-permissions"
          element={
            <Suspense fallback={<ListShimmer />}>
              <Permissions />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute moduleId={8} action="read" />}>
          <Route
            path="/customers"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Customer />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/user/:id"
          element={
            <Suspense fallback={<Shimmer />}>
              <UserProfile />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute moduleId={8} action="read" />}>
          <Route
            path="/customer/:id"
            element={
              <Suspense fallback={<Shimmer />}>
                <UserProfile />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/user/add"
          element={
            <Suspense fallback={<ListShimmer />}>
              <UserForm />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute moduleId={8} action="read" />}>
          <Route
            path="/customer/add"
            element={
              <Suspense fallback={<ListShimmer />}>
                <UserForm />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/user/edit/:id"
          element={
            <Suspense fallback={<Shimmer />}>
              <UserForm />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute moduleId={8} action="update" />}>
          <Route
            path="/customer/edit/:id"
            element={
              <Suspense fallback={<Shimmer />}>
                <UserForm />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={15} action="read" />}>
          <Route
            path="/workshops"
            element={
              <Suspense fallback={<Shimmer />}>
                <Workshop />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={16} action="read" />}>
          <Route
            path="/workshop-order"
            element={
              <Suspense fallback={<Shimmer />}>
                <WorkshopOrder />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={17} action="read" />}>
          <Route
            path="/customer-feedback"
            element={
              <Suspense fallback={<ListShimmer />}>
                <Feedback />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute moduleId={18} action="read" />}>
          <Route
            path="/contact-requests"
            element={
              <Suspense fallback={<Shimmer />}>
                <ContactRequest />
              </Suspense>
            }
          />
        </Route>

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

export { PrivateRoutes };
