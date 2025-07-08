/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";
import { usePermissions } from "../../hooks";
import { HiInformationCircle } from "react-icons/hi2";

interface LabelsTableProps {
  refetchLabels: boolean;
  setRefetchLabels: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Language {
  language_id: number;
  language_name: string;
  language_code: string;
}

interface Label {
  label_id: number;
  label_name: string;
  [key: string]: string | number | undefined;
}

const LabelsTable: React.FC<LabelsTableProps> = ({ refetchLabels }) => {
  const [loading, setLoading] = useState<{
    languagesLoading: boolean;
    labelsLoading: boolean;
    updateLabelLoading: boolean;
  }>({
    languagesLoading: true,
    labelsLoading: true,
    updateLabelLoading: false,
  });

  const { hasPermission } = usePermissions();

  const [labelData, setLabelData] = useState<Label[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [finalData, setFinalData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("authToken");

  function findChanges() {
    const changedRecords = finalData.filter((finalItem) => {
      const originalItem = labelData.find(
        (item) => item.label_id === finalItem.label_id
      );

      if (!originalItem) {
        return false;
      }

      for (const key in finalItem) {
        if (finalItem[key] !== originalItem[key]) {
          return true;
        }
      }

      return false;
    });
    return changedRecords;
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({ page: "1", perPage: newPerPage.toString() });
  };

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput.length > 50) {
      setErrorMessage("Max search input length exceeded by 50 characters");
    } else {
      setSearch(searchInput);
      setErrorMessage("");
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC");
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

  const handleInputchange = (
    label_id: number,
    language_code: string,
    value: string
  ) => {
    setFinalData((prev) =>
      prev.map((item) =>
        item.label_id === label_id ? { ...item, [language_code]: value } : item
      )
    );
  };

  const handleSave = async () => {
    const updatedLabels = findChanges();

    if (updatedLabels.length > 0) {
      const formateData = updatedLabels.map((item) => {
        const result: any = { label_id: item.label_id };
        Object.keys(item).forEach((key) => {
          if (key.startsWith("txt_")) {
            result[key] = item[key];
          }
        });
        return result;
      });

      try {
        setLoading((prev) => ({
          ...prev,
          updateLabelLoading: true,
        }));
        const response = await fetch(`${BASE_URL}/label`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formateData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to updated labels.");
        }
        toast.success(data.message);
        setLabelData(JSON.parse(JSON.stringify(finalData)));
      } catch (error) {
        toast.error(error.message || "Failed to updated labels.");
      } finally {
        setLoading((prev) => ({
          ...prev,
          updateLabelLoading: false,
        }));
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) {
      return;
    }

    const updatedLabels = findChanges();
    if (updatedLabels.length) {
      toast("Please save your changes before changing the page", {
        icon: <HiInformationCircle className="fill-green-600 h-8 w-8" />,
        style: {
          borderRadius: "10px",
          fontWeight: "500",
        },
        className: "text-sm border border-green-500",
      });
    } else {
      const totalPages = Math.ceil(count / perPage);
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        setSearchParams({
          page: newPage.toString(),
          perPage: perPage.toString(),
        });
      }
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading((prev) => {
          return {
            ...prev,
            languagesLoading: true,
          };
        });
        const response = await fetch(`${BASE_URL}/language`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch languages.");
        }

        setLanguages(data?.data);
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch languages.");
      } finally {
        setLoading((prev) => {
          return {
            ...prev,
            languagesLoading: false,
          };
        });
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        setLoading((prev) => {
          return {
            ...prev,
            labelsLoading: true,
          };
        });
        const queryParams = new URLSearchParams();
        if (currentPage)
          queryParams.append("page_number", currentPage.toString());
        if (perPage) queryParams.append("per_page", perPage.toString());
        if (search) queryParams.append("search", search);
        if (sortColumn) queryParams.append("sort_by", sortColumn);
        if (sortOrder) queryParams.append("order", sortOrder);

        const response = await fetch(
          `${BASE_URL}/label?${queryParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch labels.");
        }

        setCount(data?.count);
        setLabelData(data?.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch labels.");
      } finally {
        setLoading((prev) => {
          return {
            ...prev,
            labelsLoading: false,
          };
        });
      }
    };

    fetchLabels();
  }, [refetchLabels, perPage, currentPage, search, sortColumn, sortOrder]);

  useEffect(() => {
    if (!loading.languagesLoading && !loading.labelsLoading) {
      const data = JSON.parse(JSON.stringify(labelData));

      setFinalData(data);
    }
  }, [labelData, languages, count]);

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

  return (
    <>
      {hasPermission(21, "update") && (
        <div className="flex items-center gap-2.5 absolute top-0 right-6 xl:right-10">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading.updateLabelLoading}
          >
            {loading.updateLabelLoading ? (
              <span className="h-5.5 w-5.5 border-4 border-white/40 border-t-white border-r-white rounded-full animate-spin"></span>
            ) : (
              <i className="ki-filled ki-plus-squared"></i>
            )}
            Save
          </button>
        </div>
      )}
      {loading.languagesLoading || loading.labelsLoading ? (
        <TableShimmerEd2
          isFilters={true}
          columns={4}
          records={10}
          isPagination={true}
        />
      ) : (
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

            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="flex flex-col items-end">
                <form
                  onSubmit={onSearchSubmit}
                  className="flex items-center gap-2"
                >
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
                <table
                  className="table table-auto table-border"
                  data-datatable-table="true"
                >
                  <thead>
                    <tr>
                      <th className="w-[30px]">
                        <span
                          className={`sort ${
                            sortColumn === "label_id"
                              ? sortOrder === "ASC"
                                ? "asc"
                                : "desc"
                              : ""
                          }`}
                          onClick={() => handleSort("label_id")}
                        >
                          <span className="sort-label">Id</span>
                          <span className="sort-icon"></span>
                        </span>
                      </th>

                      <th className="min-w-[250px]">
                        <span
                          className={`sort ${
                            sortColumn === "label_name"
                              ? sortOrder === "ASC"
                                ? "asc"
                                : "desc"
                              : ""
                          }`}
                          onClick={() => handleSort("label_name")}
                        >
                          <span className="sort-label">name</span>
                          <span className="sort-icon"></span>
                        </span>
                      </th>
                      {languages.length &&
                        languages.map((language) => {
                          const { language_id, language_name, language_code } =
                            language;
                          return (
                            <th className="min-w-[225px]" key={language_id}>
                              <span
                                className={`sort ${
                                  sortColumn === language_code
                                    ? sortOrder === "ASC"
                                      ? "asc"
                                      : "desc"
                                    : ""
                                }`}
                                onClick={() => handleSort(language_code)}
                              >
                                <span className="sort-label">
                                  {language_name}
                                </span>
                                <span className="sort-icon"></span>
                              </span>
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  {finalData.length > 0 ? (
                    <tbody>
                      {finalData.map((label) => {
                        const { label_id, label_name } = label;
                        return (
                          <tr key={label_id}>
                            <td>{label_id}</td>
                            <td>{label_name}</td>
                            {languages.length > 0 &&
                              languages.map((language) => {
                                const { language_id, language_code } = language;

                                return (
                                  <td key={language_id}>
                                    <input
                                      type="text"
                                      value={label[language_code]}
                                      placeholder={`${label[language_code]}`}
                                      readOnly={!hasPermission(21, "update")}
                                      onChange={(e) =>
                                        handleInputchange(
                                          label_id,
                                          language_code,
                                          e.target.value
                                        )
                                      }
                                      className={`input placeholder:!text-gray-400${
                                        !hasPermission(21, "update")
                                          ? "!border-gray-300 !bg-gray-100 !cursor-not-allowed !focus:outline-none"
                                          : ""
                                      }`}
                                    />
                                  </td>
                                );
                              })}
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={6} className="text-center">
                          No label available
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>

              <Pagination
                count={count}
                currentPage={currentPage}
                totalRecords={labelData?.length}
                perPage={perPage}
                onPageChange={handlePageChange}
                label="labels"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LabelsTable;
