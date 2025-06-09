import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type ReportItem = {
  branch_id: number;
  branch_name: string;
  order_count: number;
  total_amount: number;
  delivery_count: number;
  delivery_amounts: number;
};

const BDReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReportItem[]>([]);
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  const handleDateChange = (dates: any) => {
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

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("authToken");

    const fetchData = async () => {
      const searchParam = new URLSearchParams();
      if (formData.start_time && formData.end_time) {
        searchParam.append("startDate", formData.start_time);
        searchParam.append("endDate", formData.end_time);
      }
      try {
        const response = await fetch(
          `${BASE_URL}/report/branch-wise-summary?${searchParam.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedData = await response.json();
        if (!response.ok) {
          toast.error(
            fetchedData.message || "Failed to fetch branch wise sales data"
          );
        }
        setData(fetchedData);
      } catch {
        toast.error("Network error: Failed to fetch branch wise sales data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formData]);

  return (
    <div className="card card-grid col-span-full">
      <div className="card-header border-none flex flex-col mt-2 items-start w-full desktop:!flex-row">
        <div
          className="flex justify-end w-full sm:w-auto sm:order-none mb-2 sm:mb-0 desktop:order-last"
          onClick={(e) => e.stopPropagation()}
        >
          <RangePicker
            className="min-w-[80px] sm:w-[250px]"
            popupClassName="custom-rangepicker-dropdown"
            onChange={handleDateChange}
            format="DD-MM-YYYY"
          />
        </div>

        <div className="flex justify-between smmobile:flex-wrap items-center w-full">
          <div className="mobile:flex mobile:gap-2 items-center">
            <h3 className="card-title">Branch Booking vs Delivery Report</h3>
          </div>
        </div>
      </div>

      <div className="card-body flex flex-col justify-end items-stretch grow !px-5 !py-4 overflow-auto">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 mb-5 rounded"></div>
            <div className="h-8 bg-gray-200 mb-5 rounded"></div>
            <div className="h-8 bg-gray-200 mb-5 rounded"></div>
            <div className="h-8 bg-gray-200 mb-5 rounded"></div>
            <div className="h-8 bg-gray-200 mb-5 rounded"></div>
          </div>
        ) : (
          <div data-datatable="true" data-datatable-page-size="10">
            <div className="new-report-container scrollable-x-auto">
              <table
                className="table table-auto table-border new-report-table"
                data-datatable-table="true"
              >
                <thead className="text-center">
                  <tr>
                    <th rowSpan={2} className="min-w-[175px]">
                      Branch
                    </th>
                    <th colSpan={2}>Booking</th>
                    <th colSpan={2}>Delivery</th>
                  </tr>
                  <tr>
                    <th className="min-w-[150px]">No. of Booking</th>
                    <th className="min-w-[150px]">Booking Amt.</th>
                    <th className="min-w-[150px]">No. of Delivery</th>
                    <th className="min-w-[150px]">Delivery Amt.</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    data.map((item) => {
                      const {
                        branch_id,
                        branch_name,
                        order_count,
                        total_amount,
                        delivery_count,
                        delivery_amounts,
                      } = item;
                      return (
                        <tr key={branch_id}>
                          <td>{branch_name}</td>
                          <td>{order_count}</td>
                          <td>{total_amount}</td>
                          <td>{delivery_count}</td>
                          <td>{delivery_amounts}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BDReport;
