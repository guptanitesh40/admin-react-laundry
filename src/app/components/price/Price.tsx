import { useState } from "react";
import PriceTable from "./PriceTable";
import LoadingSpinner from "../shimmer/Loading";
import { usePermissions } from "../../hooks";

const Price: React.FC = () => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-3">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Price
            </h1>
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
                    {" "}
                    <i className="ki-filled ki-plus-squared"></i> Saving{" "}
                    <LoadingSpinner />{" "}
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

      <PriceTable
        isSave={isSave}
        setIsSave={setIsSave}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default Price;
