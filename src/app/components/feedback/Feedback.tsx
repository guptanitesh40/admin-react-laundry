import CustomerRatingReport from "../report/CustomerRatingReport";
import FeedbackTable from "./FeedbackTable";

const Feedback: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <h1 className="text-xl font-semibold leading-none text-gray-900">
            Customer Feedback
          </h1>
        </div>
      </div>

      <div className="container-fixed">
        <CustomerRatingReport />
      </div>

      <div className="container-fixed mt-5">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <FeedbackTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
