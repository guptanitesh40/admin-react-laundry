import React from "react";
import ReportCard from "./ReportCard";
import NewReportCard from "./NewReportCard";

const reports = [
  {
    name: "Total Order Report",
    dynamic_url: "total-orders",
  },
  {
    name: "Payment Transaction Report",
    dynamic_url: "payment-transaction",
  },
  {
    name: "Refund Report",
    dynamic_url: "refund-report",
  },
  {
    name: "In Active Customer Report",
    dynamic_url: "inactive-customer-report",
  },
  {
    name: "GST Report",
    dynamic_url: "gst",
  },
  { name: "Service Wise Report", dynamic_url: "service-wise-report" },
  {
    name: "Pick Up Report",
    dynamic_url: "pickup",
  },
  {
    name: "Delivery Report",
    dynamic_url: "delivery",
  },
];

const Index: React.FC = () => {
  return (
    <main className="grow content" id="content" role="content">
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Reports
            </h1>
          </div>
        </div>

        <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => {
            if (report.name === "Service Wise Report") {
              return (
                <NewReportCard
                  key={index}
                  reportTitle={report.name}
                  dynamic_url={report.dynamic_url}
                />
              );
            } else {
              return (
                <ReportCard
                  key={index}
                  reportTitle={report.name}
                  dynamic_url={report.dynamic_url}
                  index={index}
                />
              );
            }
          })}
        </div>
      </div>
    </main>
  );
};

export default Index;
