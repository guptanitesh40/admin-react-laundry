import { useEffect } from "react";
import { useGetSalesData } from "../../hooks";
import Chart from "react-apexcharts";

const SalesReport = () => {
  const { salesData, fetchSalesData } = useGetSalesData();

  useEffect(() => {
    fetchSalesData();
  }, []);

  const categories = salesData?.map((item: { month: any }) => item.month) || [];
  const totalSales =
    salesData?.map((item: { total_sales: any }) => item.total_sales) || [];
  const totalCollection =
    salesData?.map(
      (item: { total_collection: any }) => item.total_collection
    ) || [];
  const totalUnpaidAmount = salesData?.map(
    (item: { unpaid_Amount: any }) => item.unpaid_Amount
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
        height: 280,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
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
        width: 2,
      },
      xaxis: {
        type: "category",
        categories: categories,
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
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">SalesReport</h3>
        </div>

        <div className="card-body grid gap-1">
          <div style={{ height: "280px" }}>
            <Chart
              options={data.options}
              series={data.series}
              type={data.options.chart.type}
              height={data.options.chart.height}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
