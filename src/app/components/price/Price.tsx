import { useState } from "react";
import PriceTable from "./PriceTable";
import LoadingSpinner from "../shimmer/LoadingSpinner";
import { usePermissions } from "../../hooks";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";
import PriceTableFilter from "./PriceTableFilter";

const Price: React.FC = () => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  const [filterValues, setFilterValues] = useState({
    categoryId: [] as number[],
    productId: [] as number[],
    serviceId: [] as number[],
  });

  const updateFilterValues = (newValues: typeof filterValues) => {
    setFilterValues(newValues);
  };

  return (
    <div className="px-10 max-h-[calc(100vh-69px)] flex flex-col relative">
      <div className="pb-1 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-5 py-3 ">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Price
            </h1>
          </div>

          <div className="flex justify-between items-start gap-3">
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

        <div className="flex flex-auto items-center justify-between gap-2.5 mb-2 shadow-none">
          <button
            className="btn btn-sm btn-primary shadow-none"
            onClick={() => setIsFilter(!isFilter)}
          >
            Filters
            {isFilter ? (
              <RiFilterFill size={23} />
            ) : (
              <RiFilterOffFill color="skyblue" size={23} />
            )}
          </button>
        </div>

        <div>
          {isFilter && (
            <PriceTableFilter
              filters={filterValues}
              updateFilters={updateFilterValues}
            />
          )}
        </div>
      </div>

      <div className="flex-1">
        <PriceTable
          isSave={isSave}
          setIsSave={setIsSave}
          setIsLoading={setIsLoading}
          filters={filterValues}
        />
      </div>
    </div>
  );
};

export default Price;
