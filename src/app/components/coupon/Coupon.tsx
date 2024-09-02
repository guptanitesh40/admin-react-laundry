import React, { useState } from "react";
import Modal from "react-modal";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Shimmer from "../shimmer";
import { useDeleteCoupon, useFetchCoupon } from "../../hooks";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

Modal.setAppElement("#root");

const Coupon: React.FC = () => {
  
  const { coupons, refetch, loading: loadingCoupons } = useFetchCoupon();
  const { deleteCoupon, loading: deletingCoupon } = useDeleteCoupon();

  const navigate = useNavigate();

  const handleAddCoupon = () => {
    navigate("/coupon/add");
  };

  const handleEditCoupon = (coupon: any) => {
    navigate("/coupon/add", { state: { coupon } });
  };

  const handleDeleteCoupon = async (id: number) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (isConfirmed) {
        const { success, message } = await deleteCoupon(id);
        if (success) {
          refetch();
          Swal.fire("Deleted!", message, "success");
        } else {
          Swal.fire("Error!", message, "error");
        }
      } else {
        Swal.fire("Cancelled", "The coupon is safe :)", "info");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="pl-8 pt-3">
      <div className="grid gap-5 lg:gap-7.5">
        <div className="card card-grid min-w-full">
          <div className="card-header border-0">
            <h3 className="card-title flex flex-col items-start">
              <span className="card-label font-bold text-gray-700 text-3xl mb-1">
                Coupons
              </span>
            </h3>

            <div className="card-toolbar">
              <button
                onClick={handleAddCoupon}
                className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold px-2 py-2 rounded-lg shadow-lg hover:shadow-xl"
              >
                <div className="flex">
                  <FaPlus className="mt-1 mr-1" /> Add Coupon
                </div>
              </button>
            </div>
          </div>

          <div className="card-body py-3">
            <div data-datatable="true" data-datatable-page-size="20">
              <div className="scrollable-x-auto">
                {loadingCoupons || deletingCoupon ? (
                  <Shimmer />
                ) : (
                  <div>
                    {coupons.length === 0 ? (
                      <p className="text-center text-gray-500">
                        No coupons available.
                      </p>
                    ) : (
                      <table className="table table-auto table-border" data-datatable-table="true">
                        <thead>
                          <tr>
                            <th className="w-[10px]">Id</th>
                            <th className="min-w-[50px]">Code</th>
                            <th className="min-w-[180px]">Title</th>
                            <th className="min-w-[240px]">Description</th>
                            <th className="min-w-[10px]">
                              Discount Value
                            </th>
                            <th className="min-w-[10px]">
                              Discount Type
                            </th>
                            <th className="min-w-[120px]">Valid From</th>
                            <th className="min-w-[120px]">Valid Until</th>
                            <th className="min-w-[50px]">
                              Max Usage/User
                            </th>
                            <th className="min-w-[50px]">Total Usage</th>
                            <th className="min-w-[50px]">Coupon Type</th>
                            <th className="min-w-[125px]">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {coupons.map((coupon) => (
                            <tr
                              key={coupon.coupon_id}
                            >
                              <td>{coupon.coupon_id}</td>
                              <td>{coupon.code}</td>
                              <td>{coupon.title}</td>
                              <td>
                                {coupon.description}
                              </td>
                              <td>
                                {coupon.discount_value}
                              </td>
                              <td>
                                {coupon.discount_type}
                              </td>

                              <td>
                                <div className="flex flex-col">
                                  {dayjs(coupon.start_time).format(
                                    "YYYY-MM-DD"
                                  )}
                                  <br />
                                  {dayjs(coupon.start_time).format(
                                    "hh:mm:ss A"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-col">
                                  {dayjs(coupon.end_time).format("YYYY-MM-DD")}
                                  <br />
                                  {dayjs(coupon.end_time).format("hh:mm:ss A")}
                                </div>
                              </td>

                              <td>
                                {coupon.maximum_usage_count_per_user}
                              </td>
                              <td>
                                {coupon.coupon_type}
                              </td>
                              <td>
                                {coupon.total_usage_count}
                              </td>
                              <td>
                                <button
                                  onClick={() => handleEditCoupon(coupon)}
                                  className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                                >
                                  <FaPencilAlt className="text-yellow-600" />
                                </button>

                                <button
                                  onClick={() =>
                                    handleDeleteCoupon(coupon.coupon_id)
                                  }
                                  className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                                >
                                  <FaTrash className="text-red-500" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  
                )}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Coupon;
