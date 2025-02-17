import DeliveredTable from "./DeliveredOrderTable";

const DeliveredOrder: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Delivered Orders
            </h1>
          </div>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <DeliveredTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveredOrder;
