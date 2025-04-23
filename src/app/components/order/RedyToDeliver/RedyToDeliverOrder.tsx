import { useNavigate } from "react-router-dom";
// import RedyToDeliverTable from "./RedyToDeliverOrderTable";
import { useState } from "react";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";
import OrderTableFilter from "../OrderTableFilter";
import { usePermissions } from "../../../hooks";
import OrderTable from "../OrderTable";

const RedyToDeliver: React.FC = () => {
  const navigate = useNavigate();
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [nextStatus, setNextStatus] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [trackingState, setTrackingState] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    paymentStatusFilter: [] as number[],
    orderStatusFilter: [] as number[],
    paymentTypeFilter: undefined as number | undefined,
    customerFilter: [] as number[],
    pickupBoyFilter: [] as number[],
    deliveryBoyFilter: [] as number[],
    branchFilter: [] as number[],
  });

  const handleAddOrder = () => {
    navigate("/order/add", { state: { prevUrl: location.pathname } });
  };

  const updateFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const hanldeSetNextStatus = () => {
    if (selectedStatus) {
      setTrackingState(selectedStatus);
    }
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Ready To Deliver
            </h1>
          </div>

          {hasPermission(3, "create") && (
            <div className="flex items-center gap-2.5">
              <button onClick={handleAddOrder} className="btn btn-primary">
                <i className="ki-filled ki-plus-squared"></i>Add Order
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-auto items-center justify-between gap-2.5 mb-4 shadow-none">
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

          {nextStatus && (
            <button
              className="btn btn-sm btn-outline btn-success"
              onClick={hanldeSetNextStatus}
            >
              {nextStatus}
            </button>
          )}
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            {isFilter && (
              <OrderTableFilter
                filters={filters}
                updateFilters={updateFilters}
                showOrderStatusFilter={false}
              />
            )}{" "}
            {/* <RedyToDeliverTable filters={filters} /> */}
            <OrderTable
              filters={filters}
              setSelectedOrderIds={setSelectedOrderIds}
              selectedOrderIds={selectedOrderIds}
              setNextStatus={setNextStatus}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              nextStatus={nextStatus}
              trackingState={trackingState}
              setTrackingState={setTrackingState}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RedyToDeliver;
