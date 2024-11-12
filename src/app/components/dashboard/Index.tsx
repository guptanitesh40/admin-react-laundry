import React from "react";
import LineChart from "../chart/LineChart";
import PieChart from "../chart/PieChart";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5">
          <LineChart />
        </div>
        <div className="mt-10">
        <PieChart />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
