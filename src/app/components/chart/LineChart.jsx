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
  const { orderData } = useGetOrdersData();

  const formattedData = {
    labels: orderData? orderData.map((item) => item.day) : [],
    datasets: [
      {
      label: "Orders",
      data: orderData? orderData.map((item) => item.count) : [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(153, 102, 192, 0.9)"
    ],
      }
    ]
  }

  const options = {};

  return (
    <div className="container-fixed">
      <h2>Orders</h2>      
      <Line data={formattedData} options={options} />
    </div>
  );
};

export default LineChart;
