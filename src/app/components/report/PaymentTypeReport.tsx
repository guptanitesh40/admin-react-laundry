import { useEffect, useMemo, useState } from "react";
import { useGetPaymentTypeData } from "../../hooks";
import DonutChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const PaymentTypeReport = () => {
  const { paymentTypeData, fetchPaymentTypeData } = useGetPaymentTypeData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchPaymentTypeData(formData.start_time, formData.end_time);
    } else {
      fetchPaymentTypeData();
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

  const cashOnDelivery = (paymentTypeData ?? []).reduce(
    (sum: number, item: { cash_on_delivery?: number }) =>
      sum + (item.cash_on_delivery ?? 0),
    0
  );

  const onlinePayment = (paymentTypeData ?? []).reduce(
    (sum: number, item: { online_payment?: number }) =>
      sum + (item.online_payment ?? 0),
    0
  );

  const labels = ["Cash On Delivery", "Online Payment"];
  const data = [cashOnDelivery, onlinePayment];

  const options = {
    labels: ["Cash On Delivery", "Online payment"],
    fill: {
      colors: ["var(--tw-primary)", "var(--tw-brand)"],
    },
    chart: {
      type: "donut",
      events: {
        dataPointSelection: (_event: any, _chartContext: any, config: any) => {
          if (config?.dataPointIndex !== undefined) {
            navigate("/orders", {
              state: { paymentType: labels[config.dataPointIndex] },
            });
          }
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["var(--tw-light)"],
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    legend: {
      offsetY: -5,
      offsetX: -10,
      fontSize: "14px",
      fontWeight: "500",
      labels: {
        colors: "var(--tw-gray-700)",
        useSeriesColors: false,
      },
      markers: {
        width: 8,
        height: 8,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-1">
      <div className="card">
        <div className="card-header border-none flex flex-col sm:flex-row mt-2 items-start w-full gap-x-2">
          <div className="flex justify-end w-full sm:w-auto order-1 sm:order-none mb-2 sm:mb-0 smmobile:order-2">
            {"   "}
            <RangePicker
              className="min-w-[80px] sm:w-[250px]"
              dropdownClassName="custom-rangepicker-dropdown"
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full smmobile:order-1">
            <h3 className="card-title">Payment Type</h3>
          </div>
        </div>

        <div className="card-body grid gap-1 fmobile:justify-center">
          <DonutChart
            series={data}
            options={options}
            type="donut"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentTypeReport;
