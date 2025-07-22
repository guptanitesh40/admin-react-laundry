import React from "react";
import ReportCard from "./ReportCard";

const reports = [
  {
    name: "total Order Report",
    dynamic_url: "total-orders",
  },
  {
    name: "payment Transaction Report",
    dynamic_url: "payment-transaction",
  },
  {
    name: "refund Report",
    dynamic_url: "refund-report",
  },
  {
    name: "in Active Customer Report",
    dynamic_url: "inactive-customer-report",
  },
  {
    name: "gst Report",
    dynamic_url: "gst",
  },
  {
    name: "pick Up Report",
    dynamic_url: "pickup",
  },
  {
    name: "delivery Report",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <ReportCard
              key={index}
              reportTitle={report.name}
              dynamic_url={report.dynamic_url}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Index;
