import { useEffect, useState } from "react";
import { useGetPaymentTransactionData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const PaymentTransactionReport: React.FC = () => {
  const { paymentTransactionData, fetchPaymentTransactionData } =
    useGetPaymentTransactionData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchPaymentTransactionData(formData.start_time, formData.end_time);
    } else {
      fetchPaymentTransactionData();
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
    paymentTransactionData?.map(
      (item: { month: any }) => item.month.split("-")[0]
    ) || [];
  const receivedAmount =
    paymentTransactionData?.map(
      (item: { total_amount: any }) => item.total_amount
    ) || [];

  const totalReceivedAmount = paymentTransactionData?.reduce(
    (sum: any, item: { total_transaction_amount: number }) =>
      sum + item.total_transaction_amount,
    0
  );

  const data = {
    series: [
      {
        name: "Received Amount",
        data: receivedAmount,
      },
    ],
    options: {
      chart: {
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
      stroke: {
        curve: "smooth",
        show: true,
        width: 2,
        linecap: "butt",
        dashArray: 4,
        colors: ["#dbdfe9"],
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
            return `${value}`;
          },
        },
      },
      markers: {
        size: 2,
        colors: "#dbdfe9",
        strokeColors: "#dbdfe9",
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
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  };

  return (
    <div className="col-span-1">
      <div className="card w-full">
        <div className="card-header border-none flex flex-col sm:flex-row mt-2 items-start w-full gap-x-2">
          <div className="flex justify-end w-full sm:w-auto order-1 sm:order-none mb-2 sm:mb-0 smmobile:order-2">
            <RangePicker
              className="min-w-[70px] sm:w-[250px]"
              popupClassName="custom-rangepicker-dropdown"
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full smmobile:order-1">
            <div>
              <h3 className="card-title">Payment Report</h3>
              <h5 className="block text-gray-500 text-sm font-bold">
                <div className="flex flex-wrap flex-row gap-x-2">
                  <span>Total Received Amount</span>
                  <span> ₹{totalReceivedAmount?.toLocaleString()} </span>
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
            height={225}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentTransactionReport;
