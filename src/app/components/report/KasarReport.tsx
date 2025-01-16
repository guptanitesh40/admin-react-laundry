import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useGetKasarData } from "../../hooks";

const KasarReport = () => {
  const { kasarData, fetchKasarData } = useGetKasarData();

  useEffect(() => {
    fetchKasarData();
  }, []);

  const categories = kasarData?.map((item: { month: any }) => item.month) || [];
  const totalKasarAmount =
    kasarData?.map(
      (item: { totalKasarAmount: any }) => item.totalKasarAmount
    ) || [];
  const totalOrderAmount =
    kasarData?.map(
      (item: { totalOrderAmount: any }) => item.totalOrderAmount
    ) || [];

  const data = {
    series: [
      {
        name: "Total Kasar Amount",
        data: totalKasarAmount,
      },
      {
        name: "Total Order Amount",
        data: totalOrderAmount,
      },
    ],
    options: {
      chart: {
        height: 280,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "category",
        categories: categories,
      },
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Kasar Report</h3>
        </div>
        <div className="card-body grid gap-1">
          <div style={{ height: "280px" }}>
            <Chart
              options={data.options}
              series={data.series}
              type={data.options.chart.type}
              height={data.options.chart.height}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KasarReport;
