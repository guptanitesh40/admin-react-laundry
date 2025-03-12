import { useLocation } from "react-router-dom";
import PermissionTable from "./PermissionTable";
import { useState } from "react";
import LoadingSpinner from "../shimmer/LoadingSpinner";

const Permissions: React.FC = () => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();

  const role = location?.state?.role;

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              {role} Permissions
            </h1>
            <p className="text-sm text-gray-500">
              Manage permissions for the {role}.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              className="btn btn-primary"
              onClick={() => setIsSave(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  {" "}
                  Saving{" "}
                  <LoadingSpinner />{" "}
                </>
              ) : (
                <>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <PermissionTable
              isSave={isSave}
              setIsSave={setIsSave}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Permissions;
