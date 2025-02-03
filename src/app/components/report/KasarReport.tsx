import React, { useEffect } from "react";
import AreaChart from "react-apexcharts";
import { useGetKasarData } from "../../hooks";

const KasarReport = () => {
  const { kasarData, fetchKasarData } = useGetKasarData();

  useEffect(() => {
    fetchKasarData();
  }, []);

  const categories = kasarData?.map((item: { month: any }) => item.month) || [];
  const kasarAmount =
    kasarData?.map(
      (item: { total_kasar_amount: any }) => item.total_kasar_amount
    ) || [];
  const totalOrderAmount =
    kasarData?.map(
      (item: { total_order_amount: any }) => item.total_order_amount
    ) || [];

  const totalKasarAmount = kasarData?.reduce(
    (sum: any, item: { total_kasar_amount: any }) =>
      sum + item.total_kasar_amount,
    0
  );

  const data = {
    series: [
      {
        name: "Total Kasar Amount",
        data: kasarAmount,
      },
      {
        name: "Total Order Amount",
        data: totalOrderAmount,
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.25,
          opacityTo: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "var(--tw-gray-200)",
        strokeDashArray: 5,
        clipMarkers: false,
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: ["var(--tw-primary)", "var(--tw-brand)", "var(--tw-warning)"],
      },
      xaxis: {
        type: "category",
        categories: categories,
        style: {
          colors: "#6c757d",
        },
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "var(--tw-primary)",
            width: 1,
            dashArray: 3,
          },
        },
      },
      yaxis: {
        min: 0,
        tickAmount: 5,
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "var(--tw-gray-500)",
            fontSize: "12px",
          },
          formatter: (value: any) => {
            if (value >= 1000) {
              return `₹${(value / 1000).toFixed(0)}K`;
            }
            return value.toString();
          },
        },
      },
      markers: {
        size: 2,
        colors: ["var(--tw-primary)", "var(--tw-brand)", "var(--tw-warning)"],
        strokeColors: ["var(--tw-primary)", "var(--tw-brand)", "var(--tw-warning)"],
        strokeWidth: 4,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
        hover: {
          size: 4,
          sizeOffset: 0,
        },
      },
      legend: {
        show: false,
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
      <div className="col-span-1">
        <div className="card w-full">
          <div className="card-header border-none flex flex-col mt-2 items-start">
            <h3 className="card-title">Kasar Report</h3>
            <h5 className="block text-gray-500 text-sm font-bold">
              Total Kasar Amount ₹{totalKasarAmount?.toLocaleString()}
            </h5>
          </div>

          <div className="card-body grid gap-1">
            <div className="h-[210px]">
              <AreaChart
                options={data.options}
                series={data.series}
                type={data.options.chart.type}
                height={210}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KasarReport;
