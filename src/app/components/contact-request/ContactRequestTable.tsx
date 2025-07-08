import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetContactRequestData } from "../../hooks";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";
import dayjs from "dayjs";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";

const ContactRequestTable: React.FC = () => {
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

  const { contactRequestData, loading, count } = useGetContactRequestData(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );

  const totalPages = Math.ceil(count / perPage);

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

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [search]);

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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        columns={6}
        records={10}
        isPagination={true}
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
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
          <span>per page</span>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-5 mb-3">
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
                  <th className="min-w-[70px]">
                    <span
                      className={`sort ${
                        sortColumn === "contact_us_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("contact_us_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>
                  <th className="min-w-[250px]">
                    <span
                      className={`sort ${
                        sortColumn === "full_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("full_name")}
                    >
                      <span className="sort-label">Full name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>
                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "created_at"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("created_at")}
                    >
                      <span className="sort-label">Request time</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>
                  <th className="min-w-[130px]">
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
                    </span>
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
                      <span className="sort-label">Mobile no</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>
                  <th className="min-w-[350px]">Message</th>
                </tr>
              </thead>
              {contactRequestData?.length > 0 ? (
                <tbody>
                  {contactRequestData?.map((contactData: any) => (
                    <tr key={contactData.contact_us_id}>
                      <td>{contactData.contact_us_id}</td>
                      <td>{contactData.full_name}</td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {dayjs(contactData.created_at).format("DD-MM-YYYY")}
                          <br />
                          {dayjs(contactData.created_at).format("hh:mm:ss A")}
                        </div>
                      </td>
                      <td>{contactData.email}</td>
                      <td>{contactData.mobile_number}</td>
                      <td>{contactData.message}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center">
                      No data available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={contactRequestData?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="records"
          />
        </div>
      </div>
    </>
  );
};

export default ContactRequestTable;
