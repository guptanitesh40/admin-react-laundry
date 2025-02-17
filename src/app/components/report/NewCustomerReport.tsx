import { useEffect } from "react";
import { useGetNewCustomerData } from "../../hooks";
import BarChart from "react-apexcharts";

const NewCustomerReport: React.FC = () => {
  const { customerData, fetchNewCustomerData } = useGetNewCustomerData();

  useEffect(() => {
    fetchNewCustomerData();
  }, []);

  const categories =
    customerData?.map((item: { month: any }) => item.month) || [];
  const customerCount =
    customerData?.map(
      (item: { customer_count: number }) => item.customer_count
    ) || [];

  const totalCustomers = customerData?.reduce(
    (sum: number, customer: { customer_count: number }) =>
      sum + Number(customer.customer_count),
    0
  );

  const data = {
    series: [
      {
        name: "New Customer",
        data: customerCount,
      },
    ],
    options: {
      chart: {
        fontFamily: "inherit",
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: "blue",
      },
      xaxis: {
        categories: categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "var(--tw-gray-500)",
            fontSize: "12px",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
        },
      },
      colors: ["#ECE852"],
      grid: {
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
  };

  return (
    <div className="col-span-1">
      <div className="card w-full rounded-md">
        <div className="card-header border-none">
          <div className="flex flex-col justify-between">
            <h3 className="card-title">New Customer</h3>
          </div>
          <div className="mt-2">
            <span className="p-3 bg-red-50 rounded-md relative text-gray-500 semibold">
              +{totalCustomers}
            </span>
          </div>
        </div>

        <div className="card-body flex flex-col justify-end items-stretch grow px-0 py-1">
          <BarChart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={170}
          />
        </div>
      </div>
    </div>
  );
};

export default NewCustomerReport;
