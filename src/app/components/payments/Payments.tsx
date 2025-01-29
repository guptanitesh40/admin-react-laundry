import PaymentsTable from "./PaymentsTable";

const Payments: React.FC = () => {
  return (
    <div className="mt-5">
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <h1 className="text-xl font-semibold leading-none text-gray-900">
            Payments
          </h1>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <PaymentsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
