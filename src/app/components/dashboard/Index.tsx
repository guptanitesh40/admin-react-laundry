import React from "react";
import OrderReport from "../report/OrderReport";
import DeliveryPendingReport from "../report/DeliveryPendingReport";
import PaymentTypeReport from "../report/PaymentTypeReport";
import KasarReport from "../report/KasarReport";
import DeliveryCompletedReport from "../report/DeliveryCompletedReport";
import PendingAmountReport from "../report/PendingAmountReport";
import RefundAmountReport from "../report/RefundAmountReport";
import PaymentTransactionReport from "../report/PaymentTransactionReport";
import CustomerActivityReport from "../report/CustomerActivityReport";
import DeliveryReport from "../report/DeliveryReport";
import SalesBookingReport from "../report/SalesBookingReport";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:grid-cols-1 lg:gap-5 w-full">
          <OrderReport />
          <DeliveryPendingReport />
          <DeliveryCompletedReport /> 
          <DeliveryReport />
          <SalesBookingReport />
          <RefundAmountReport/>
          <PendingAmountReport />
          <KasarReport />
          <PaymentTypeReport />
          <PaymentTransactionReport />
          <CustomerActivityReport />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
