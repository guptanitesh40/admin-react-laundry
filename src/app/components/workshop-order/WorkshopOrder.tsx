import WorkshopOrderTable from "./WorkshopOrderTable";
import { useState } from "react";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";
import WorkshopOrderFilter from "./WorkshopOrderFilter";
import { OrderStatus } from "../../../types/enums";

const WorkshopOrder: React.FC = () => {
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [nextStatus, setNextStatus] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [trackingState, setTrackingState] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    paymentStatusFilter: [] as number[],
    workshopOrderStatusFilter: [] as number[],
    paymentTypeFilter: undefined as number | undefined,
    customerFilter: [] as number[],
    branchFilter: [] as number[],
    workshopFilter: [] as number[],
    workshopManagerFilter: [] as number[],
  });

  const updateFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const getOrderStatusOptions = (excludedKey: (keyof typeof OrderStatus)[]) => {
    return Object.entries(OrderStatus)
      .filter(([key]) => excludedKey.includes(key as keyof typeof OrderStatus))
      .map(([label, value]) => ({ label, value: value as number }));
  };

  const workshopOrderStatusOptions = getOrderStatusOptions([
    "Workshop Assigned",
    "Order Received at Workshop",
    "Order Work In Progress",
  ]);

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
              Workshop Orders
            </h1>
          </div>
        </div>

        {/* <div className="flex flex-auto items-center gap-2.5 mb-4 shadow-none"> */}
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
              <WorkshopOrderFilter
                filters={filters}
                updateFilters={updateFilters}
                workshopOrderStatusOptions={workshopOrderStatusOptions}
              />
            )}{" "}
            <WorkshopOrderTable
              filters={filters}
              selectedOrderIds={selectedOrderIds}
              setSelectedOrderIds={setSelectedOrderIds}
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

export default WorkshopOrder;
