import { useEffect, useState } from "react";
import { useGetSalesData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const SalesBookingReport = () => {
  const { salesData, fetchSalesData } = useGetSalesData();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchSalesData(formData.start_time, formData.end_time);
    } else {
      fetchSalesData();
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
    salesData?.map((item: { month: any }) => item.month.split("-")[0]) || [];
  const totalSales =
    salesData?.map((item: { total_sales: any }) => item.total_sales) || [];
  const totalCollection =
    salesData?.map(
      (item: { total_collection: any }) => item.total_collection
    ) || [];
  const totalUnpaidAmount = salesData?.map(
    (item: { unpaid_amount: any }) => item.unpaid_amount
  );

  const totalOrderAmount = salesData?.reduce(
    (sum: any, item: { total_sales: any }) => sum + item.total_sales,
    0
  );

  const data = {
    series: [
      {
        name: "Total Sales",
        data: totalSales,
      },
      {
        name: "Total Collection",
        data: totalCollection,
      },
      {
        name: "Total Unpaid",
        data: totalUnpaidAmount,
      },
    ],
    options: {
      chart: {
        height: 300,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.25,
          opacityTo: 0,
        },
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
      markers: {
        size: categories?.length === 1 ? 5 : 0,
        hover : {
          size : 7,
        }
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 2,
        colors: ["var(--tw-primary)", "var(--tw-brand)", "var(--tw-warning)"],
      },
      legend: {
        show: false,
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
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  };

  return (
    <div className="col-span-2">
      <div className="card w-full">
        <div className="card-header border-none flex flex-col mt-2 items-start w-full desktop:!flex-row">
          <div className="flex justify-end w-full sm:w-auto sm:order-none mb-2 sm:mb-0 desktop:order-last">
            <RangePicker
              className="min-w-[80px] sm:w-[250px]"
              dropdownClassName="custom-rangepicker-dropdown"
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full">
            <div className="fmobile:flex fmobile:gap-2 fmobile:items-center">
              <h3 className="card-title">Sales Booking</h3>
              <h5 className="block text-gray-500 text-sm font-bold">
                <div className="flex flex-wrap align-items flex-row gap-x-2">
                  <span>Total Order Amount</span>
                  <span>₹{totalOrderAmount?.toLocaleString()} </span>
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
            height={data.options.chart.height}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesBookingReport;