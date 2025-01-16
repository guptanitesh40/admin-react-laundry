import React from "react";
import OrderReport from "../report/OrderReport";
import SalesReport from "../report/SalesReport";
import DeliveryPendingReport from "../report/DeliveryPendingReport";
import PaymentTypeReport from "../report/paymentTypeReport";
import KasarReport from "../report/KasarReport";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
          <OrderReport />
          <DeliveryPendingReport />
          <SalesReport />
          <KasarReport/>
          <PaymentTypeReport />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
