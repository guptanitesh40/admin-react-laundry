import { useEffect, useState } from "react";
import { useDeleteCoupon, useGetCoupons, usePermissions } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import { CouponType, DiscountType } from "../../../types/enums";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";

const CouponTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const [couponTypeFilter, setCouponTypeFilter] = useState<number>();
  const [discountTypeFiter, setDicountTypeFilter] = useState<number>();

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const { coupons, fetchCoupons, loading, count } = useGetCoupons(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    discountTypeFiter,
    couponTypeFilter
  );
  const { hasPermission } = usePermissions();
  const { deleteCoupon } = useDeleteCoupon();

  const navigate = useNavigate();

  const totalPages = Math.ceil(count / perPage);

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
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [discountTypeFiter, couponTypeFilter]);

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await searchSchema.validate(
        { search: searchInput },
        { abortEarly: false }
      );
      setSearch(searchInput);
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      }
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC");
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
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

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        columns={4}
        records={10}
        isPagination={false}
      />
    );
  }

  return (
    <>
      <div className="card-header card-header-space flex-wrap">
        <div className="flex items-center gap-2 mb-4">
          <span>Show</span>
          <select
            className="select select-sm w-16"
            data-datatable-size="true"
            name="perpage"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>per page</span>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-5 mb-3">
          <div className="flex flex-wrap gap-2.5">
            <select
              className="select select-lg w-[170px] text-sm"
              value={couponTypeFilter}
              onChange={(e) => {
                setCouponTypeFilter(Number(e.target.value));
              }}
            >
              <option value="" selected>
                Coupon Type
              </option>
              <option value={1}>Website</option>
              <option value={2}>App</option>
              <option value={3}>Both</option>
            </select>

            <select
              className="select select-lg w-[170px] text-sm"
              value={discountTypeFiter}
              onChange={(e) => {
                setDicountTypeFilter(Number(e.target.value));
              }}
            >
              <option value="" selected>
                Discount type
              </option>
              <option value={1}>Amount</option>
              <option value={2}>Percentage</option>
            </select>
          </div>

          <div className="flex">
            <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
              <label className="input input-sm h-10 flex items-center gap-2">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    if (e.target.value === "") {
                      setSearch("");
                    }
                  }}
                  placeholder="Search..."
                  className="min-w-[185px] flex-grow"
                />
                <button type="submit" className="btn btn-sm btn-icon">
                  <i className="ki-filled ki-magnifier"></i>
                </button>
              </label>
            </form>
            <p className="text-red-500 text-sm mt-1">
              {errorMessage || "\u00A0"}
            </p>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div data-datatable="true" data-datatable-page-size="10">
          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th className="min-w-[50px]">
                    <span
                      className={`sort ${
                        sortColumn === "coupon_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("coupon_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "code"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("code")}
                    >
                      <span className="sort-label">Coupon code</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[180px]">Title</th>

                  <th className="min-w-[240px]">Description</th>

                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "discount_value"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("discount_value")}
                    >
                      <span className="sort-label">Discount value</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[170px]">Discount type</th>

                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "start_time"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("start_time")}
                    >
                      <span className="sort-label">Valid from</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "end_time"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("end_time")}
                    >
                      <span className="sort-label">Valid unti</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "maximum_usage_count_per_user"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("maximum_usage_count_per_user")}
                    >
                      <span className="sort-label">Max Usage/User</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[160px]">
                    <span
                      className={`sort ${
                        sortColumn === "total_usage_count"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("total_usage_count")}
                    >
                      <span className="sort-label">Total Usage</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[170px]">Coupon Type</th>

                  {(hasPermission(9, "update") ||
                    hasPermission(9, "delete")) && (
                    <th className="min-w-[125px]">Actions</th>
                  )}
                </tr>
              </thead>
              {coupons.length > 0 ? (
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.coupon_id}>
                      <td>
                        <span className="flex items-center gap-2.5">
                          {coupon.coupon_id}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-2.5">
                          {coupon.code}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-2.5">
                          {coupon.title}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-2.5">
                          {coupon.description}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-2.5">
                          {coupon.discount_value}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-2.5">
                          {
                            DiscountType[
                              coupon.discount_type as unknown as keyof typeof DiscountType
                            ]
                          }
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {dayjs(coupon.start_time).format("DD-MM-YYYY")}
                          <br />
                          {dayjs(coupon.start_time).format("hh:mm:ss A")}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {dayjs(coupon.end_time).format("DD-MM-YYYY")}
                          <br />
                          {dayjs(coupon.end_time).format("hh:mm:ss A")}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {coupon.maximum_usage_count_per_user}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {coupon.total_usage_count}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {
                            CouponType[
                              coupon.coupon_type as unknown as keyof typeof CouponType
                            ]
                          }
                        </div>
                      </td>
                      {(hasPermission(9, "update") ||
                        hasPermission(9, "delete")) && (
                        <td>
                          {hasPermission(9, "update") && (
                            <button
                              onClick={() => handleEditCoupon(coupon)}
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                            >
                              <FaPencilAlt className="text-yellow-600" />
                            </button>
                          )}

                          {hasPermission(9, "delete") && (
                            <button
                              onClick={() =>
                                handleDeleteCoupon(coupon.coupon_id)
                              }
                              className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            >
                              <FaTrash className="text-red-500" />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">
                      No coupon available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      <Pagination
        count={count}
        currentPage={currentPage}
        totalRecords={coupons?.length}
        perPage={perPage}
        onPageChange={handlePageChange}
        label="coupons"
      />
    </>
  );
};

export default CouponTable;
