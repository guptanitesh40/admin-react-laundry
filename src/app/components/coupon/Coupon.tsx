import React from "react";
import CouponTable from "./CouponTable";
import { useNavigate } from "react-router-dom";

const Coupon: React.FC = () => {
  const navigate = useNavigate();

  const handleAddCoupon = () => {
    navigate("/coupon/add");
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Coupon
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={handleAddCoupon} className="btn btn-primary">
              <i className="ki-filled ki-plus-squared"></i>Add Coupon
            </button>
          </div>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <CouponTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
