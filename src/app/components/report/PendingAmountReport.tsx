import React, { useEffect, useState } from "react";
import PieChart from "react-apexcharts";
import { useGetPendingAmountData } from "../../hooks";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const PendingAmountReport: React.FC = () => {
  const { pendingAmountData, fetchPendingAmountData } =
    useGetPendingAmountData();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchPendingAmountData(formData.start_time, formData.end_time);
    } else {
      fetchPendingAmountData();
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

  const totalAmounts =
    pendingAmountData?.reduce(
      (sum: number, item: any) => sum + item.total_amount,
      0
    ) || 0;

  const pendingAmounts =
    pendingAmountData?.reduce(
      (sum: number, item: any) => sum + item.pending_amount,
      0
    ) || 0;

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Total Amount", "Pending Amount"],
    colors: ["#34a853", "#fbbc04"],
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
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
  };

  const chartSeries = [totalAmounts, pendingAmounts];

  return (
    <div className="col-span-1">
      <div className="card">
        <div className="card-header border-none flex flex-col sm:flex-row mt-2 items-start w-full">
          <div className="flex justify-end w-full sm:w-auto order-1 sm:order-none mb-2 sm:mb-0 smmobile:order-2">
            <RangePicker
              className="min-w-[80px] sm:w-[250px]"
              dropdownClassName="custom-rangepicker-dropdown"
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full smmobile:order-1">
            <h3 className="card-title">Pending Amount</h3>
          </div>
        </div>

        <div className="card-body grid gap-1 fmobile:justify-center">
          <PieChart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            height={220}
          />
        </div>
      </div>
    </div>
  );
};

export default PendingAmountReport;
