import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDeliveryData, usePermissions } from "../../hooks";
import DonutChart from "react-apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const DeliveryReport: React.FC = () => {
  const navigate = useNavigate();
  const { deliveryData, fetchDeliveryData } = useGetDeliveryData();
  const { hasPermission } = usePermissions();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchDeliveryData(formData.start_time, formData.end_time);
    } else {
      fetchDeliveryData();
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

  const deliveryCompleted =
    deliveryData?.reduce(
      (sum: number, item: { completed: number }) => sum + item.completed,
      0
    ) || 0;

  const deliveryPending =
    deliveryData?.reduce(
      (sum: number, item: { pending: number }) => sum + item.pending,
      0
    ) || 0;

  const labels = ["Delivery Completed", "Delivery Pending"];
  const data = [deliveryCompleted, deliveryPending];

  const options = {
    labels,
    fill: {
      colors: ["var(--tw-primary)", "var(--tw-brand)"],
    },
    chart: {
      type: "donut",
      events: {
        dataPointSelection: (_event: any, _chartContext: any, config: any) => {
          if (hasPermission(3, "read")) { 
            if (config?.dataPointIndex === 0) {
              navigate("/delivered-orders");
            } else if (config?.dataPointIndex === 1) {
              navigate("/orders");
            }
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
        expandOnClick: false,
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
        <div className="card-header border-none flex flex-col mt-2 items-start w-full desktop:!flex-row">
          <div
            className="flex justify-end w-full sm:w-auto order-1 sm:order-none mb-2 sm:mb-0 desktop:!order-2"
            onClick={(e) => e.stopPropagation()}
          >
            <RangePicker
              className="min-w-[80px] sm:w-[250px]"
              popupClassName="custom-rangepicker-dropdown"
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full smmobile:order-1">
            <h3 className="card-title">Delivery Report</h3>
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

export default DeliveryReport;
