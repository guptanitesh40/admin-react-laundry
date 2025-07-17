import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  count: number;
  currentPage: number;
  totalRecords: number;
  perPage: number;
  onPageChange: (page: any) => void;
  label: string
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, count, totalRecords, perPage, onPageChange, label }) => {
    
  const totalPages = Math.ceil(count / perPage);

  const generatePageNumbers = (totalPages: number, currentPage: number) => {
    const visiblePages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        visiblePages.push("...");
      }

      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }

      if (end < totalPages - 1) {
        visiblePages.push("...");
      }

      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  return (
    count > perPage && (
      <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
          <span className="text-gray-700">
            Showing {totalRecords} of {count} {label}
          </span>
          <div className="pagination flex flex-wrap" data-datatable-pagination="true">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className={` btn btn-light ${currentPage === 1 ? "disabled" : ""}`}
            >
              <FaChevronLeft />
            </button>
            {generatePageNumbers(totalPages, currentPage).map(
              (page: any, index) =>
                page === "..." ? (
                  <span key={index} className="px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button   
                    key={index}
                    className={`btn btn-light !bg-red-800 ${currentPage === page ? "active-btn" : ""}`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                )
            )}
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className={`btn btn-light ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Pagination;
