import { useState } from "react";
import PriceTable from "./PriceTable";
import LoadingSpinner from "../shimmer/LoadingSpinner";
import * as Yup from "yup";
import { usePermissions } from "../../hooks";
import { searchSchema } from "../../validation/searchSchema";

const Price: React.FC = () => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { hasPermission } = usePermissions();

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

  return (
    <div className="px-10 max-h-[calc(100vh-69px)] flex flex-col relative">
      <div className="flex flex-wrap items-center justify-between gap-5 py-3 sticky-save-header">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-xl font-semibold leading-none text-gray-900">
            Price
          </h1>
        </div>

        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col items-end">
            <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
              <label className="input input-sm h-10 flex items-center gap-2">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    if (e.target.value === "") {
                      setSearch("");
                      setErrorMessage("");
                    }
                  }}
                  placeholder="Search..."
                  className="min-w-[185px]"
                />
                <button type="submit" className="btn btn-sm btn-icon">
                  <i className="ki-filled ki-magnifier"></i>
                </button>
              </label>
            </form>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessage || "\u00A0"}
              </p>
            )}
          </div>

          {(hasPermission(10, "create") || hasPermission(10, "update")) && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsSave(true)}
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="ki-filled ki-plus-squared"></i> Saving{" "}
                    <LoadingSpinner />
                  </>
                ) : (
                  <>
                    <i className="ki-filled ki-plus-squared"></i> Save
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto new-scollbar -mr-4 pr-2">
        <PriceTable
          isSave={isSave}
          setIsSave={setIsSave}
          setIsLoading={setIsLoading}
          search={search}
        />
      </div>
    </div>
  );
};

export default Price;
