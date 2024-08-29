import React, { useState } from "react";
import Modal from "react-modal";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Shimmer from "../shimmer";
import CouponModal from "./CouponModal";
import { useAddCoupon, useDeleteCoupon, useFetchCoupon, useUpdateCoupon } from "../../hooks";

Modal.setAppElement("#root");

const Coupon: React.FC = () => {
  const { coupons, refetch, loading: loadingCoupons } = useFetchCoupon();
  const { addCoupon, loading: addingCoupon } = useAddCoupon();
  const { deleteCoupon, loading: deletingCoupon } = useDeleteCoupon();
  const { updateCoupon, loading: updatingCoupon } = useUpdateCoupon(refetch);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentCoupon, setCurrentCoupon] = useState<any | null>(null);

  const handleAddCoupon = () => {
    setEditMode(false);
    setModalIsOpen(true);
  };

  const handleEditCoupon = (coupon: any) => {
    setCurrentCoupon(coupon);
    setEditMode(true);
    setModalIsOpen(true);
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
    setCurrentCoupon(null);
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
    <div>
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
            disabled={addingCoupon}
          >
            <div className="flex">
              <FaPlus className="mt-1 mr-1" /> Add Coupon
            </div>
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {loadingCoupons || addingCoupon || deletingCoupon || updatingCoupon ? (
          <Shimmer />
        ) : (
          <div className="table-responsive">
            {coupons.length === 0 ? (
              <p className="text-center text-gray-500">No coupons available.</p>
            ) : (
              <table className="w-full bg-white rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Id</th>
                    <th className="px-6 py-3 text-left">Code</th>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Discount Value</th>
                    <th className="px-6 py-3 text-left">Discount Type</th>
                    <th className="px-6 py-3 text-left">Valid From</th>
                    <th className="px-6 py-3 text-left">Valid Until</th>
                    <th className="px-6 py-3 text-left">Max Usage/User</th>
                    <th className="px-6 py-3 text-left">Total Usage</th>
                    <th className="px-12 py-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {coupons.map((coupon: any) => (
                    <tr
                      className="hover:bg-gray-50 transition-colors duration-200"
                      key={coupon.coupon_id}
                    >
                      <td className="px-6 py-2">{coupon.coupon_id}</td>
                      <td className="px-6 py-2">{coupon.code}</td>
                      <td className="px-6 py-2">{coupon.title}</td>
                      <td className="px-6 py-2">{coupon.description}</td>
                      <td className="px-6 py-2">{coupon.discount_value}</td>
                      <td className="px-6 py-2">{coupon.discount_type}</td>
                      <td className="px-6 py-2">
                        {new Date(coupon.start_time).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-2">
                        {new Date(coupon.end_time).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-2">{coupon.maximum_usage_count_per_user}</td>
                      <td className="px-6 py-2">{coupon.total_usage_count}</td>
                      <td className="flex px-9 py-2 justify-end text-end m-auto">
                        <button
                          onClick={() => handleEditCoupon(coupon)}
                          className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                        >
                          <FaPencilAlt className="text-yellow-600" />
                        </button>

                        <button
                          onClick={() => handleDeleteCoupon(coupon.coupon_id)}
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

      <CouponModal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelClick}
        editMode={editMode}
        currentCoupon={currentCoupon}
        addCoupon={(formData: FormData) => addCoupon(formData)}
        updateCoupon={(id: number, formData: FormData) =>
          updateCoupon(id, formData)
        }
        refetch={refetch}
        loading={addingCoupon || updatingCoupon}
        handleCancelClick={handleCancelClick}
      />
    </div>
  );
};

export default Coupon;
