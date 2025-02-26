import { useNavigate } from "react-router-dom";
import CustomerTable from "./CustomerTable";
import CustomerActivityReport from "../report/CustomerActivityReport";
import NewCustomerReport from "../report/NewCustomerReport";
import InActiveCustomerReport from "../report/InActiveCustomerReport";
import { usePermissions } from "../../hooks";

const Customer: React.FC = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const handleAddCustomer = () => {
    navigate("/customer/add");
  };

  return (
    <>
      <div className="container-fixed grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 desktop:grid-cols-1 zx:grid-cols-1 pb-8 gap-x-4 gap-y-4">
        <CustomerActivityReport />
        <NewCustomerReport />
        <InActiveCustomerReport />
      </div>

      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-4">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Customers
            </h1>
          </div>

          {hasPermission(8, "create") && (
            <div className="flex items-center gap-2.5">
              <button className="btn btn-primary" onClick={handleAddCustomer}>
                <i className="ki-filled ki-plus-squared"></i>Add Customer
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <CustomerTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
