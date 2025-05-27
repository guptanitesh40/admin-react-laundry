import React, { useState } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const BDReport: React.FC = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

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

  return (
    <div className="container-fixed">
      <div className="grid gap-5 lg:gap-7.5">
        <div className="card card-grid min-w-full">
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
                <h3 className="card-title">New Report</h3>
                {/* <h5 className="block text-gray-500 text-sm font-bold">
              <div className="flex flex-wrap align-items flex-row gap-x-2">
                <span className="ml-1">{10000}</span>
              </div>
            </h5> */}
              </div>
            </div>
          </div>

          <div className="card-body flex flex-col justify-end items-stretch grow px-5 py-4">
            {/* <div data-datatable="true" data-datatable-page-size="10"> */}
            <div className="scrollable-x-auto">
              <div className="new-report-container">
                <table
                  className="table table-auto table-border new-report-table"
                  data-datatable-table="true"
                >
                  <thead className="text-center">
                    <tr>
                      <th rowSpan={2} className="min-w-[200px]">
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
                    <tr>
                      <td>Memnagar</td>
                      <td>0</td>
                      <td>00.00</td>
                      <td>0</td>
                      <td>00.00</td>
                    </tr>
                    <tr>
                      <td>Naranpura</td>
                      <td>0</td>
                      <td>00.00</td>
                      <td>0</td>
                      <td>00.00</td>
                    </tr>
                    <tr>
                      <td>Home Service</td>
                      <td>19</td>
                      <td>37700</td>
                      <td>21</td>
                      <td>17580</td>
                    </tr>
                    <tr>
                      <td>Visitor</td>
                      <td>1</td>
                      <td>700</td>
                      <td>0</td>
                      <td>00.00</td>
                    </tr>
                    <tr>
                      <td>Tatvam</td>
                      <td>0</td>
                      <td>00.00</td>
                      <td>0</td>
                      <td>00.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDReport;
