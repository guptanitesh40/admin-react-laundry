import React from "react";
import OrderReport from "../report/OrderReport";
import SalesReport from "../report/SalesReport";
import DeliveryPendingReport from "../report/DeliveryPendingReport";
import PaymentTypeReport from "../report/paymentTypeReport";
import KasarReport from "../report/KasarReport";
import DeliveryCompletedReport from "../report/DeliveryCompletedReport";
import PendingAmountReport from "../report/PendingAmountReport";
import RefundAmountReport from "../report/RefundAmountReport";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-5 w-full">
          <OrderReport />
          <DeliveryPendingReport />
          <DeliveryCompletedReport/>
          <SalesReport/>
          <RefundAmountReport/>
          <PendingAmountReport />
          <PaymentTypeReport/>
          <KasarReport/>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
