import { useGetOrdersData } from "../../hooks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const OrderReport = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

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
    ? (orderData || []).map((item: { day: any }) => item.day)
    : [];
  const orders = orderData
    ? (orderData || []).map((item: { count: any }) => item.count)
    : [];

  const orderCount = orderData?.reduce(
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
        height: 200,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 6,
        colors: ["#ffffff"],
        strokeColors: "#4154f1",
        strokeWidth: 3,
        hover: {
          size: 8,
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
        curve: "smooth",
        width: 3,
        lineCap: "round",
      },
      grid: {
        borderColor: "rgba(0, 0, 0, 0)",
        padding: {
          top: -20,
          right: 0,
          bottom: 20,
          left: 12,
        },
        marker: {
          strokeColor: "#1976d2",
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: "category",
        categories: categories,
        style: {
          colors: "#6c757d",
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          show: false,
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
      <div className="col-span-1">
        <div className="card pb-2.5 w-full">
          <div className="card-body grid gap-1">
            <div className="flex flex-col">
              <h3 className="card-title">Orders</h3>
              <span className="text-[#384551] font-medium ml-1">{orderCount }</span>
            </div>
            <div style={{ height: "150px" }}>
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

export default OrderReport;
