import React from "react";
import OrderReport from "../report/OrderReport";
import PaymentTypeReport from "../report/PaymentTypeReport";
import KasarReport from "../report/KasarReport";
import PendingAmountReport from "../report/PendingAmountReport";
import RefundAmountReport from "../report/RefundAmountReport";
import PaymentTransactionReport from "../report/PaymentTransactionReport";
import DeliveryReport from "../report/DeliveryReport";
import SalesBookingReport from "../report/SalesBookingReport";
import BranchSalesCollectionReport from "../report/BranchSalesCollectionReport";
import ActionButtons from "../report/ActionButtons";
// import BDReport from "../report/BDReport";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="w-full">
          <ActionButtons />
        </div>
        {/* <div className="mt-5 mb-5 grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-5 w-full">
          <BDReport />
        </div> */}
        <div className="mt-5 mb-5 grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-5 w-full">
          <OrderReport />
          <DeliveryReport />
        </div>
        <div className="mt-5 mb-5 grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-5 w-full">
          <SalesBookingReport />
        </div>
        <div className="mt-5 mb-5 grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-5 w-full">
          <BranchSalesCollectionReport />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-5 w-full">
          <RefundAmountReport />
          <PendingAmountReport />
          <KasarReport />
          <PaymentTypeReport />
          <PaymentTransactionReport />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
