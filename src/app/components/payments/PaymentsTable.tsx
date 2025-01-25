import { useEffect, useState } from "react";
import { useGetPayments } from "../../hooks";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";
import dayjs from "dayjs";
import MultiSelect from "../MultiSelect/MultiSelect";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";

interface OptionType {
  label: string;
  value: number;
}

const PaymentsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [customerSearch, setCustomerSearch] = useState("");
  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState([]);
  const [userFilter, setUserFilter] = useState<number[]>([]);

  const { payments, count } = useGetPayments(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    userFilter,
    paymentStatusFilter
  );

  const paymentStatusOptions = [
    { label: "Created", value: "created" },
    { label: "Paid", value: "paid" },
    { label: "Attempted", value: "attempted" },
  ];

  const { fetchUsersByRole } = useGetUsersByRole();

  const totalPages = Math.ceil(count / perPage);

  useEffect(() => {
    const fetchCustomer = async () => {
      const customers = await fetchUsersByRole(5, customerSearch);
      const formattedOptions = customers?.map((user: any) => ({
        label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
        value: user.user_id,
      }));
      setCustomerOptions(formattedOptions);
    };
    if (customerSearch) {
      fetchCustomer();
    }
  }, [customerSearch]);

  useEffect(() => {
    if (pageParams) {
      setCurrentPage(Number(pageParams));
    }
    if (perPageParams) {
      setPerPage(Number(perPageParams));
    }
  }, [pageParams, perPageParams]);

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
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
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

  if (!payments) return;

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

        <div className="flex flex-wrap gap-2 lg:gap-2 mb-3">
          <div className="flex flex-wrap gap-2.5">
            <MultiSelect
              options={paymentStatusOptions}
              displayValue="label"
              placeholder="Select Payment Status"
              selectedValues={paymentStatusFilter}
              onSelect={(selectedList: any) =>
                setPaymentStatusFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              onRemove={(selectedList: any) =>
                setPaymentStatusFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              className="min-w-[180px]"
              sliceCount={1}
              isSearchInput={false}
            />

            <MultiSelect
              options={customerOptions}
              displayValue="user_name"
              placeholder="Select Customer"
              selectedValues={userFilter}
              onSelect={(selectedList: any) =>
                setUserFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              onRemove={(selectedList: any) =>
                setUserFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              className="min-w-[320px]"
              setSearch={setCustomerSearch}
            />
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
                  className="min-w-[150px] flex-grow"
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
                  <th className="min-w-[250px]">
                    <span
                      className={`sort ${
                        sortColumn === "first_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("first_name")}
                    >
                      <span className="sort-label">Customer Name</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                  <th className="min-w-[250px]">
                    <span
                      className={`sort ${
                        sortColumn === "email"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("email")}
                    >
                      <span className="sort-label">Email</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                  <th className="min-w-[130px]">
                    <span
                      className={`sort ${
                        sortColumn === "mobile_number"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("mobile_number")}
                    >
                      <span className="sort-label">Mobile No</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                  <th className="min-w-[120px]">
                    <span
                      className={`sort ${
                        sortColumn === "razorpay_transaction_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("razorpay_transaction_id")}
                    >
                      <span className="sort-label">Transaction Id</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                  <th className="min-w-[120px]">Created At</th>
                  <th className="min-w-[60px]">Status</th>
                  <th className="min-w-[120px]">Order Id</th>
                  <th className="min-w-[60px]">Currency</th>
                  <th className="min-w-[60px]">
                    <span
                      className={`sort ${
                        sortColumn === "amount"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("amount")}
                    >
                      <span className="sort-label">Amount</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                </tr>
              </thead>
              {payments.length > 0 ? (
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.razorpay_transaction_id}>
                      <td>
                        {payment.user.first_name} {payment.user.last_name}
                      </td>
                      <td>{payment.user.email}</td>
                      <td>{payment.user.mobile_number}</td>
                      <td>{payment.razorpay_transaction_id}</td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {dayjs(payment.created_at).format("DD-MM-YYYY")}
                          <br />
                          {dayjs(payment.created_at).format("hh:mm:ss A")}
                        </div>
                      </td>
                      <td>{payment.status}</td>
                      <td>{payment.razorpay_order_id}</td>
                      <td>{payment.currency}</td>
                      <td>{payment.amount}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">
                      No Payments data available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          {count > perPage && (
            <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  Showing {payments.length} of {count} Orders
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
                      className={`btn ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentsTable;
