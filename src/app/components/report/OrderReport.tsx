import { useGetOrdersData } from "../../hooks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AreaChart from "react-apexcharts";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const OrderReport = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  const navigate = useNavigate();

  const { orderData, fetchOrdersData } = useGetOrdersData();

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchOrdersData(formData.start_time, formData.end_time);
    } else {
      fetchOrdersData();
    }
  }, [formData]);

  const handleDateChange = (newDate: dayjs.Dayjs, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: newDate ? newDate.format("DD-MM-YYYY") : "",
    }));
  };

  const categories = orderData
    ? (orderData || []).map((item: { month: any }) => item.month.split("-")[0])
    : [];
  const orders = orderData
    ? (orderData || []).map((item: { count: any }) => item.count)
    : [];

  const orderCount =
    orderData?.reduce(
      (sum: number, order: { count: number }) => sum + Number(order.count),
      0
    ) || 0;

  const data = {
    series: [
      {
        name: "Orders",
        data: orders,
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
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
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 2,
        dashArray: 0,
      },
      grid: {
        borderColor: "rgba(0, 0, 0, 0)",
        padding: {
          top: 0,
          right: 0,
          bottom: 10,
          left: 10,
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
      markers:
        orderData?.length === 1
          ? {
              size: 2,
              colors: "#1976d2",
              strokeColors: "#1976d2",
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
            }
          : {
              size: 0,
            },
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  };

  const handleNavigateToOrderList = () => {
    navigate("/orders");
  };

  return (
    <>
      <div
        className="card pb-2.5 max-h-[300px] cursor-pointer"
        onClick={handleNavigateToOrderList}
      >
        <div className="card-header border-none flex mt-2 items-start w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="card-title">Orders</h3>
              <h5 className="block text-gray-500 text-sm font-bold">
                <div className="flex flex-wrap flex-row gap-x-2">
                  <span className="ml-1">{orderCount}</span>
                </div>
              </h5>
            </div>
            <div className="self-end mb-3">
              <FiShoppingCart size={23} color="rgb(13 202 240)" />
            </div>
          </div>
        </div>

        <div className="card-body flex flex-col justify-end items-stretch grow px-3 py-1">
          <AreaChart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={240}
          />
        </div>
      </div>
    </>
  );
};

export default OrderReport;
