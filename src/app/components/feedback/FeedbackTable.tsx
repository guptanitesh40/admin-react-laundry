import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useApproveFeedback,
  useGetFeedbacks,
  usePermissions,
} from "../../hooks";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";
import { getPublishStatusLabel } from "../../utils/publishStatus";
import dayjs from "dayjs";
import MultiSelect from "../MultiSelect/MultiSelect";
import toast from "react-hot-toast";
import TableShimmer from "../shimmer/TableShimmer";
import { ratingStarClasses } from "../../utils/ratingStarClasses";
import Pagination from "../pagination/Pagination";

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

  const [publishFilter, setPublishFilter] = useState<number | null>();
  const [ratingFilter, setRatingFilter] = useState([]);

  const { feedbacks, count, fetchFeedbacks, loading } = useGetFeedbacks(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    ratingFilter,
    publishFilter
  );
  const { approveFeedback } = useApproveFeedback();

  const { hasPermission } = usePermissions();

  const totalPages = Math.ceil(count / perPage);

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
        perPage: perPage.toString(),
      });
    }
  }, [search]);

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

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={`rating-label ${index < rating ? "checked" : ""}`}
      >
        <i
          className={`rating-on ki-solid ki-star text-base leading-none ${
            index < rating ? ratingStarClasses(rating) : ""
          }`}
        ></i>
        <i className="rating-off ki-outline ki-star text-base leading-none"></i>
      </div>
    ));
  };

  const handleDropdownChange = async (feedback_id: number, value: any) => {
    try {
      await approveFeedback(feedback_id, value);

      fetchFeedbacks();
    } catch {
      toast.error("Failed to update publish status:");
    }
  };

  const ratingOptions = Array.from({ length: 5 }, (_, index) => ({
    label: (
      <div className="flex items-center" key={index}>
        <div className="mr-1">{index + 1}</div>
        <div className="rating-label checked mb-1">
          <i
            className={`rating-on ${ratingStarClasses(
              index + 1
            )} ki-solid ki-star text-base leading-none`}
          ></i>
          <i className="rating-off ki-outline ki-star text-base leading-none"></i>
        </div>
      </div>
    ),
    value: index + 1,
  }));

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
            <MultiSelect
              options={ratingOptions}
              displayValue="label"
              placeholder="Select Rating"
              selectedValues={ratingFilter}
              onSelect={(selectedList: any) =>
                setRatingFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              onRemove={(selectedList: any) =>
                setRatingFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              className="lgmobile:min-w-[250px] vsmobile:min-w-[235px]"
              sliceCount={3}
              isSearchInput={false}
            />
          </div>

          <div className="flex flex-wrap gap-2.5">
            <select
              className={`select select-lg w-[170px] text-sm ${getPublishStatusLabel(
                publishFilter
              )}`}
              value={publishFilter}
              onChange={(e) => setPublishFilter(Number(e.target.value))}
            >
              <option value="">Publish Status</option>
              <option value="1" className="badge-danger badge-outline">
                None
              </option>
              <option value="2" className="badge-info badge-outline">
                Website
              </option>
              <option value="3" className="badge-warning badge-outline">
                Mobile App
              </option>
              <option value="4" className="badge-secondary badge-outline">
                Both
              </option>
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
                    </span>
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
                    </span>
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
                  <th className="min-w-[100px]">Rating</th>
                  <th className="min-w-[300px]">Comment</th>
                  <th className="min-w-[120px]">
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
                      <span className="sort-label">Date</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>
                  {(hasPermission(17, "create") ||
                    hasPermission(17, "update")) && (
                    <th className="min-w-[140px]">Publish</th>
                  )}
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : feedbacks?.length > 0 ? (
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
                        <div className="rating">
                          {renderRatingStars(feedback.rating)}
                        </div>
                      </td>
                      <td>{feedback.comment}</td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {dayjs(feedback.created_at).format("DD-MM-YYYY")}
                          <br />
                          {dayjs(feedback.created_at).format("hh:mm:ss A")}
                        </div>
                      </td>
                      {(hasPermission(17, "create") ||
                        hasPermission(17, "update")) && (
                        <td>
                          <select
                            className={`select select-lg w-[170px] text-sm ${getPublishStatusLabel(
                              feedback.is_publish
                            )}`}
                            value={feedback.is_publish}
                            onChange={(e) =>
                              handleDropdownChange(
                                feedback.feedback_id,
                                e.target.value
                              )
                            }
                          >
                            <option
                              value="1"
                              className="badge-danger badge-outline"
                            >
                              None
                            </option>
                            <option
                              value="2"
                              className="badge-info badge-outline"
                            >
                              Website
                            </option>
                            <option
                              value="3"
                              className="badge-warning badge-outline"
                            >
                              Mobile App
                            </option>
                            <option
                              value="4"
                              className="badge-secondary badge-outline"
                            >
                              Both
                            </option>
                          </select>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center">
                      No feedback data available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={feedbacks?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="feedbacks"
          />
        </div>
      </div>
    </>
  );
};

export default FeedbackTable;
