import BookingOrderTable from "./BookingOrderTable";

const BookingOrder: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Booking Orders
            </h1>
          </div>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <BookingOrderTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingOrder;
