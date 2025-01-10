import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetFeedbacks } from "../../hooks";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";
import { IsPublish } from "../../../types/enums";
import { getPublishStatusLabel } from "../../utils/publishStatus";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";

const FeedbackTable: React.FC = () => {
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

  const { feedbacks, count } = useGetFeedbacks(
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

  const renderRatingStars = (rating: any) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={`rating-label ${index < rating ? "checked" : ""}`}
      >
        <i className="rating-on ki-solid ki-star text-base leading-none"></i>
        <i className="rating-off ki-outline ki-star text-base leading-none"></i>
      </div>
    ));
  };

  if (!feedbacks) return;

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

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex flex-col items-start">
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
                        sortColumn === "order_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("order_id")}
                    >
                      <span className="sort-label">Order Id</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
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
                      <span className="sort-label">Customer name</span>
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
                  <th className="min-w-[100px]">
                    <span
                      className={`sort ${
                        sortColumn === "rating"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("rating")}
                    >
                      <span className="sort-label">Rating</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                  <th className="min-w-[300px]">
                    <span
                      className={`sort ${
                        sortColumn === "comment"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("comment")}
                    >
                      <span className="sort-label">Comment</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                  <th className="min-w-[120px]">
                    <span
                      className={`sort ${
                        sortColumn === "date"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("date")}
                    >
                      <span className="sort-label">Date</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                  <th className="min-w-[140px]">
                    <span
                      className={`sort ${
                        sortColumn === "is_publish"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("is_publish")}
                    >
                      <span className="sort-label">Publish</span>
                      <span className="sort-icon"></span>
                    </span>{" "}
                  </th>
                </tr>
              </thead>
              {feedbacks.length > 0 ? (
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback.feedback_id}>
                      <td>#{feedback.order_id}</td>
                      <td>
                        {feedback?.order?.user?.first_name}{" "}
                        {feedback?.order?.user?.last_name}
                      </td>
                      <td>{feedback?.order?.user?.email}</td>
                      <td>{feedback?.order?.user?.mobile_number}</td>
                      <td>
                        <span>
                          <div className="rating">
                            {renderRatingStars(feedback.rating)}
                          </div>
                        </span>
                      </td>
                      <td>{feedback.comment}</td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {dayjs(feedback.created_at).format("DD-MM-YYYY")}
                          <br />
                          {dayjs(feedback.created_at).format("hh:mm:ss A")}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`mt-1 rounded-md text-sm ${getPublishStatusLabel(
                            feedback.is_publish
                          )}`}
                        >
                          {
                            IsPublish[
                              feedback.is_publish as keyof typeof IsPublish
                            ]
                          }
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">
                      No Feedback data available
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
                  Showing {feedbacks.length} of {count} Users
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

export default FeedbackTable;
