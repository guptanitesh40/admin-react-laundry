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
      (item: { total_kasar_amount: any }) => item.total_kasar_amount
    ) || [];
  const totalOrderAmount =
    kasarData?.map(
      (item: { total_order_amount: any }) => item.total_order_amount
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
        height: 210,
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
        categories: categories,
        axisBorder: {
          show: false,
        },
        maxTicks: 12,
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "var(--tw-gray-500)",
            fontSize: "12px",
          },
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "var(--tw-primary)",
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: false,
          offsetY: 0,
          style: {
            fontSize: "12px",
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
            return `${value}`;
          },
        },
      },
      legend: {
        show: false,
      },
      markers: {
        size: 0,
        colors: "var(--tw-primary-light)",
        strokeColors: "var(--tw-primary)",
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
          size: 8,
          sizeOffset: 0,
        },
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
      <div className="col-span-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Kasar Report</h3>
          </div>
          <div className="card-body grid gap-1">
            <div className="h-[210px]">
              <Chart
                options={data.options}
                series={data.series}
                type={data.options.chart.type}
                height={data.options.chart.height}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KasarReport;
