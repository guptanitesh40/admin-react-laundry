import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useGetPriceContents, usePermissions } from "../../hooks";
import TableShimmer from "../shimmer/TableShimmer";
import Swal from "sweetalert2";
import useDeletePriceContent from "../../hooks/price-content/useDeletePriceContent";
import { useEffect } from "react";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";

interface PriceContentTableProps {
  setUpdateItem: (price_content_id: number) => void;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
}

const PriceContentTable: React.FC<PriceContentTableProps> = ({
  isSubmit,
  setIsSubmit,
  setUpdateItem,
}) => {
  const { priceContents, fetchPriceContents, loading } = useGetPriceContents();
  const { deletePriceContent } = useDeletePriceContent();
  const { hasPermission } = usePermissions();

  useEffect(() => {
    const refetchData = async () => {
      if (isSubmit) {
        fetchPriceContents();
        setIsSubmit(false);
      }
    };
    refetchData();
  }, [isSubmit]);

  const handleDeleteItem = async (price_content_id: number) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (isConfirmed) {
        const { success, message } = await deletePriceContent(price_content_id);
        if (success) {
          fetchPriceContents();
          Swal.fire(message);
        } else {
          Swal.fire(message);
        }
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="grid gap-5 lg:gap-7.5">
        <div className="card card-grid min-w-full">
          <TableShimmerEd2
            isFilters={false}
            columns={4}
            records={4}
            isPagination={false}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 lg:gap-5.5">
        <div className="card card-grid min-w-full">
          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th className="min-w-[30px]">Id</th>
                    <th className="min-w-[120px]">Category</th>
                    <th className="min-w-[120px]">Service</th>
                    <th className="min-w-[60px]">Price</th>
                    {(hasPermission(11, "update") ||
                      hasPermission(11, "delete")) && (
                      <th className="w-[50px]">Actions</th>
                    )}
                  </tr>
                </thead>
                {priceContents.length > 0 ? (
                  <tbody>
                    {priceContents.map((item) => (
                      <tr key={item.price_content_id}>
                        <td>{item.price_content_id}</td>
                        <td>{item.category_name}</td>
                        <td>{item.service_names.join(", ")}</td>
                        <td>{item.price}</td>
                        {(hasPermission(11, "update") ||
                          hasPermission(11, "delete")) && (
                          <td>
                            <div className="flex gap-2">
                              {hasPermission(11, "update") && (
                                <button
                                  className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full"
                                  onClick={() =>
                                    setUpdateItem(item.price_content_id)
                                  }
                                >
                                  <FaPencilAlt className="text-yellow-600" />
                                </button>
                              )}

                              {hasPermission(11, "delete") && (
                                <button
                                  className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                                  onClick={() =>
                                    handleDeleteItem(item.price_content_id)
                                  }
                                >
                                  <FaTrash className="text-red-500" />
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={5} className="text-center">
                        No price data available
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceContentTable;
