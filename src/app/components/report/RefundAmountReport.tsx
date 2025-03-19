import React, { useEffect, useState } from "react";
import BarChart from "react-apexcharts";
import { useGetRefundAmountData } from "../../hooks";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const RefundAmountReport: React.FC = () => {
  const { refundAmountData, fetchRefundAmountData } = useGetRefundAmountData();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchRefundAmountData(formData.start_time, formData.end_time);
    } else {
      fetchRefundAmountData();
    }
  }, [formData]);

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setFormData({
        start_time: dayjs(dates[0]).format("DD-MM-YYYY"),
        end_time: dayjs(dates[1]).format("DD-MM-YYYY"),
      });
    } else {
      setFormData({
        start_time: "",
        end_time: "",
      });
    }
  };

  const categories =
    refundAmountData?.map((item: any) => item.month.split("-")[0]) || [];
  const refundAmounts =
    refundAmountData?.map((item: any) => item.total_refund_amount) || [];
  const totalAmounts =
    refundAmountData?.map((item: any) => item.total_amount) || [];

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "var(--tw-gray-500)",
          fontSize: "12px",
        },
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
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
    colors: ["#1E90FF", "#FF6347"],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "65%",
            },
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Total Amount",
      data: totalAmounts,
    },
    {
      name: "Refund Amount",
      data: refundAmounts,
    },
  ];

  return (
    <div className="col-span-1">
      <div className="card w-full">
        <div className="card-header border-none flex flex-col mt-2 items-start w-full desktop:!flex-row">
          <div className="flex justify-end w-full sm:w-auto sm:order-none mb-2 sm:mb-0 desktop:!order-last">
            <RangePicker
              className="min-w-[80px] sm:w-[250px]"
              dropdownClassName="custom-rangepicker-dropdown"
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full">
            <h2 className="card-title">Refund Amount Report</h2>
          </div>
        </div>

        <div className="card-body flex flex-col justify-end items-stretch grow px-0 py-1">
          <BarChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={240}
          />
        </div>
      </div>
    </div>
  );
};

export default RefundAmountReport;
