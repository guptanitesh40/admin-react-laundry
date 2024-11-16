import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetOrdersData } from "../../hooks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
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

  const handleDateChange = (newDate, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: newDate ? newDate.format("DD-MM-YYYY") : "",
    }));
  };

  const formattedData = {
    labels: orderData ? orderData.map((item) => item.day) : [],
    datasets: [
      {
        label: "Orders",
        data: orderData ? orderData.map((item) => item.count) : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 192, 0.9)",
        ],
      },
    ],
  };

  const options = {};

  return (
    <div className="card w-[990px]">
      <div className="card-header">
        <h3 className="card-title">Orders</h3>
        <div className="flex gap-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={
                formData.start_time
                  ? dayjs(formData.start_time, "DD-MM-YYYY")
                  : null
              }
              onChange={(newDate) => handleDateChange(newDate, "start_time")}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    style: {
                      height: "35px",
                      width: "155px",
                      fontSize: "14px",
                    },
                  },
                },
              }}
            />
            <h2 className="m-1">To</h2>
            <DatePicker
              value={
                formData.end_time
                  ? dayjs(formData.end_time, "DD-MM-YYYY")
                  : null
              }
              onChange={(newDate) => handleDateChange(newDate, "end_time")}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    style: {
                      height: "35px",
                      width: "155px",
                      fontSize: "14px",
                    },
                  },
                },
              }}
              minDate={
                formData.start_time
                  ? dayjs(formData.start_time, "DD-MM-YYYY")
                  : dayjs()
              }
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="w-[500px] h-[250px] card-body flex flex-col justify-end items-stretch grow px-3 py-1">
        <Line data={formattedData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
