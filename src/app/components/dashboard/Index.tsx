import React from "react";
import OrderReport from "../report/OrderReport";
import PaymentTypeReport from "../report/PaymentTypeReport";
import KasarReport from "../report/KasarReport";
import PendingAmountReport from "../report/PendingAmountReport";
import RefundAmountReport from "../report/RefundAmountReport";
import PaymentTransactionReport from "../report/PaymentTransactionReport";
import DeliveryReport from "../report/DeliveryReport";
import SalesBookingReport from "../report/SalesBookingReport";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-5 w-full">
          <OrderReport />
          <DeliveryReport />
        </div>
        <div className="mt-5 mb-5 grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-5 w-full">
          <SalesBookingReport />
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
