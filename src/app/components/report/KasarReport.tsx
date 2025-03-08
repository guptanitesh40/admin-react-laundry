import React, { useEffect, useState } from "react";
import AreaChart from "react-apexcharts";
import { useGetKasarData } from "../../hooks";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const KasarReport = () => {
  const { kasarData, fetchKasarData } = useGetKasarData();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchKasarData(formData.start_time, formData.end_time);
    } else {
      fetchKasarData();
    }
  }, [formData]);

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setFormData({
        start_time: dateStrings[0],
        end_time: dateStrings[1],
      });
    } else {
      setFormData({
        start_time: "",
        end_time: "",
      });
    }
  };

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
        width: 2,
        colors: ["var(--tw-primary)", "var(--tw-brand)", "var(--tw-warning)"],
      },
      xaxis: {
        type: "category",
        categories: categories,
        labels: {
          show: true,
          style: {
            colors: "#6B7280",
            fontSize: "12px",
            fontWeight: 500,
          },
        },
        axisTicks: {
          show: true,
          color: "#D1D5DB",
          height: 6,
        },
        axisBorder: {
          show: true,
          color: "#D1D5DB",
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "#3B82F6",
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
        strokeColors: [
          "var(--tw-primary)",
          "var(--tw-brand)",
          "var(--tw-warning)",
        ],
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
          <div className="card-header border-none flex flex-col sm:flex-row mt-2 items-start w-full gap-x-2">
            <div className="flex justify-end w-full sm:w-auto order-1 sm:order-none mb-2 sm:mb-0 smmobile:order-2">
              <RangePicker
                className="min-w-[80px] sm:w-[250px]"
                dropdownClassName="custom-rangepicker-dropdown"
                onChange={handleDateChange}
              />
            </div>

            <div className="flex justify-between smmobile:flex-wrap items-center w-full smmobile:order-1">
              <div className="fmobile:flex fmobile:gap-2">
                <h3 className="card-title">Kasar Report</h3>
                <h5 className="block text-gray-500 text-sm font-bold">
                  <div className="flex flex-wrap align-items flex-row gap-x-2">
                    <span>Total Kasar Amount </span>
                    <span>₹{totalKasarAmount?.toLocaleString()}</span>
                  </div>
                </h5>
              </div>
            </div>
          </div>

          <div className="card-body flex flex-col justify-end items-stretch grow px-3 py-1">
            <AreaChart
              options={data.options}
              series={data.series}
              type={data.options.chart.type}
              height={212}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KasarReport;
