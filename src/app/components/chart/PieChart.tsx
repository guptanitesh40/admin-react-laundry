import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetPaymentData } from "../../hooks";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentData {
  paymentType: string;
  count: number;
}

const PieChart = () => {
  const { paymentData, fetchPaymentData } = useGetPaymentData();

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const formattedData = {
    labels: (paymentData || []).map((item: PaymentData) => item.paymentType),
    datasets: [
      {
        data: (paymentData || []).map((item: PaymentData) => item.count),
        backgroundColor: (paymentData || []).map(
          () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        ),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: "280px" }}>
      <Pie
        data={formattedData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 20,
                padding: 20,
                usePointStyle: true,
              },
            },
          },
          cutout: "60%",
        }}
      />
    </div>
  );
};

export default PieChart;
