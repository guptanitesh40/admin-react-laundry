import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Loading from "../shimmer/Loading";
import toast from "react-hot-toast";

const ReportPreview = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { url, reportTitle } = location.state || {};

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          setData(json);
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch(() => {
        toast.error("Failed to fetch or parse Excel file");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url;
    document.body.appendChild(link);

    link.click();
    link.remove();
  };

  if (!url)
    return (
      <div className="p-4 font-medium text-center text-red-600">
        report URL not found.
      </div>
    );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fixed">
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">{reportTitle} Preview</h2>
        <div className="flex items-center justify-center gap-4">
          <button
            className="inline-flex items-center gap-2 btn btn-primary"
            onClick={handleGoBack}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go Back
          </button>

          <button
            className="inline-flex items-center gap-2 btn btn-primary"
            onClick={handleDownload}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12L12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download
          </button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="grid gap-5 lg:gap-7.5">
          <div className="min-w-full overflow-hidden card card-grid">
            <div className="card-body">
              <div data-datatable="true" data-datatable-page-size="10">
                <div className="scrollable-x-auto scrollable-y-auto">
                  <table
                    className="table table-auto table-border min-w-full !border-collapse"
                    data-datatable-table="true"
                  >
                    <thead className="bg-gray-100">
                      <tr>
                        {Object.keys(data[0]).map((key) => (
                          <th
                            key={key}
                            className="px-3 py-2 text-left border min-w-[120px] whitespace-nowrap"
                          >
                            <span className="font-medium sort-label">
                              {key}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {Object.values(row).map((val, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-3 py-2 border whitespace-pre-wrap break-words min-w-[100px]"
                            >
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-4 font-medium text-center text-gray-600">
          Report loaded, but no rows were found in the Excel sheet.
        </div>
      )}
    </div>
  );
};

export default ReportPreview;
