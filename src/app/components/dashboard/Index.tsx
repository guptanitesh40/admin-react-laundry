import React from "react";
import LineChart from "../chart/LineChart";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <LineChart />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
