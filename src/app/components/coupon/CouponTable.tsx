import { useEffect, useState } from "react";
import { useDeleteCoupon, useFetchCoupon } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaChevronLeft, FaChevronRight, FaPencilAlt, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import TableShimmer from "../shimmer/TableShimmer";

interface CouponTableProps {
    search: string;
}

const CouponTable: React.FC<CouponTableProps> = ({
    search
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");
  const { coupons, fetchCoupons,loading, totalCoupons } = useFetchCoupon(currentPage, perPage,search, sortColumn, sortOrder);
  
  const navigate = useNavigate();
  
  const totalPages = Math.ceil(totalCoupons / perPage);  

  const { deleteCoupon } = useDeleteCoupon();

  const handleDeleteCoupon = async (coupon_id: number) => {
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
        const { success, message } = await deleteCoupon(coupon_id);
        if (success) {
          const updatedCoupons = coupons.filter(
            (coupon) => coupon.coupon_id !== coupon_id
          );         
          if (updatedCoupons.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchCoupons();
          Swal.fire(message);
        } else {
          Swal.fire(message);
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

  const handleEditCoupon = (coupon: any) => {
    navigate(`/coupon/edit/${coupon.coupon_id}`, { state: { coupon } });
  };

  useEffect(() => {
    if (pageParams) {
      setCurrentPage(Number(pageParams));
    }
    if (perPageParams) {
      setPerPage(Number(perPageParams));
    }
  }, [pageParams, perPageParams]);

  useEffect(() => {
    if (search) {
      setCurrentPage(1);
      setSearchParams({
        search: search,
        page: "1", 
        perPage: perPage.toString()      
      });
    }
    else
    {
      setSearchParams({
        page: "1", 
        perPage: perPage.toString()      
      });
    }
  }, [search]);
  
  useEffect(() => {
    fetchCoupons();
  }, [perPage, currentPage, search, sortColumn, sortOrder, fetchCoupons]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortOrder === "ASC") {
        setSortOrder("DESC");
      } else {
        setSortOrder("ASC");
      }
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
    fetchCoupons();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams({
        page: newPage.toString(),
        perPage: perPage.toString(),
      });
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({ page: "1", perPage: newPerPage.toString() });
  };

  return (
    <>
    <div className="inline-block">
        <div className="flex mb-3 items-center gap-2">
          Show
          <select
            className="select select-sm w-16"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          per page
        </div>
      </div>
    <div className="grid gap-5 lg:gap-7.5">
      <div className="card card-grid min-w-full">
        <div className="card-body">
          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th className="min-w-[100px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("coupon_id")}
                      >
                        Id
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "coupon_id" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "coupon_id" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                    </div>
                  </th>
                  <th className="min-w-[150px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("code")}
                      >
                        Code
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "code" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "code" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                    </div>
                  </th>
                  <th className="min-w-[180px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("title")}
                      >
                        Title
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "title" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "title" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                    </div>
                  </th>
                  <th className="min-w-[240px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("description")}
                      >
                        Description
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "description" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "description" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                    </div>
                  </th>
                  <th className="min-w-[150px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("discount_value")}
                      >
                        Discount value
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "discount_value" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "discount_value" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                 </div>
                  </th>
                  <th className="min-w-[170px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("discount_type")}
                      >
                        Discount Type
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "discount_type" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "discount_type" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                    </div>
                  </th>
                  <th className="min-w-[150px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("start_time")}
                      >
                        Valid From
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "valid_from" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "valid_from" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                    </div>
                  </th>
                  <th className="min-w-[150px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("end_time")}
                      >
                        Valid Until
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "valid_until" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "valid_until" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                    </div>
                  </th>
                  <th className="min-w-[150px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("maximum_usage_count_per_user")}
                      >
                        Max Usage/User
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "maximum_usage_count_per_user" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "maximum_usage_count_per_user" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                  </div>
                  </th>
                  <th className="min-w-[160px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("total_usage_count")}
                      >
                        Total Usage
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "total_usage_count" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "total_usage_count" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                  </div>
                  </th>
                  <th className="min-w-[170px]">
                  <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("coupon_type")}
                      >
                        Coupon Type
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "coupon_type" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "coupon_type" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                  </div>
                  </th>
                  <th className="min-w-[125px]">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <TableShimmer/>
              ) :
              coupons.length > 0 ? (
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.coupon_id}>
                      <td>{coupon.coupon_id}</td>
                      <td>{coupon.code}</td>
                      <td>{coupon.title}</td>
                      <td>{coupon.description}</td>
                      <td>{coupon.discount_value}</td>
                      <td>
                        {coupon.discount_type === 1 ? "percentage" : "flat"}
                      </td>

                      <td>
                        <div className="flex flex-col">
                          {dayjs(coupon.start_time).format("YYYY-MM-DD")}
                          <br />
                          {dayjs(coupon.start_time).format("hh:mm:ss A")}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          {dayjs(coupon.end_time).format("YYYY-MM-DD")}
                          <br />
                          {dayjs(coupon.end_time).format("hh:mm:ss A")}
                        </div>
                      </td>

                      <td>{coupon.maximum_usage_count_per_user}</td>
                      <td>{coupon.coupon_type}</td>
                      <td>{coupon.total_usage_count}</td>
                      <td>
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
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">
                      No coupons available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
    {totalCoupons > perPage && (
          <div className="flex items-center gap-4 mt-4">
            <span className="text-gray-700">
              Showing {coupons.length} of {totalCoupons} Coupons
            </span>
            <div className="pagination" data-datatable-pagination="true">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`btn ${currentPage === 1 ? "disabled" : ""}`}
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`btn ${currentPage === index + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`btn ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default CouponTable;
