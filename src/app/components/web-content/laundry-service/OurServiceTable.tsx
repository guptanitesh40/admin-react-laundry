import { useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
// import { useDeleteBanner, useGetBanners, usePermissions } from "../../hooks";
import Swal from "sweetalert2";
import useGetOurServices from "../../../hooks/web-content/our-service/useGetOurServices";
import TableShimmerEd2 from "../../shimmer/TableShimmerEd2";
import useDeleteOurService from "../../../hooks/web-content/our-service/useDeleteOurService";

interface OurServiceTableProps {
  setEditBanner: (banner_id: number) => void;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
}

const OurServiceTable: React.FC<OurServiceTableProps> = ({
  setEditBanner,
  isSubmit,
  setIsSubmit,
}) => {
  const { deleteOurService } = useDeleteOurService();

  const { services,, fetchOurServices } = useGetOurServices();
  const { laundryServices, loading, fetchLaundryServices } = useGetLaundryServices();

  useEffect(() => {
    const refetchData = async () => {
      if (isSubmit) {
        fetchLaundryServices();
        setIsSubmit(false);
      }
    };
    refetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  const handleDelete = async (id: number) => {
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
        const { success, message } = await deleteOurService(id);

        if (success) {
          await fetchOurServices();
          Swal.fire("Deleted!", message, "success");
        } else {
          Swal.fire("Error", message, "error");
        }
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error?.message || "Unexpected error occurred",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <TableShimmerEd2 columns={4} records={3} />;
  }

  return (
    <>
      <div className="card-body">
        <div data-datatable="true" data-datatable-page-size="10">
          <div className="scrollable-x-auto">
            <table
              className="table table-auto table-border"
              data-datatable-table="true"
            >
              <thead>
                <tr>
                  <th className="w-[60px]">
                    <span className="sort-label">Id</span>
                  </th>
                  <th className="min-w-[105px]">Image</th>
                  <th className="min-w-[160px]">
                    <span className="sort-label">Title</span>
                  </th>
                  <th className="min-w-[205px]">
                    <span className="sort-label">Description</span>
                  </th>
                  <th className="min-w-[125px] w-[125px]">Actions</th>
                </tr>
              </thead>

              {laundryServices.length > 0 ? (
                <tbody>
                  {laundryServices.map((item) => (
                    <tr key={item.service_list_id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {item.service_list_id}
                        </div>
                      </td>
                      <td className="flex justify-center items-center">
                        <img
                          alt={item.image}
                          className="rounded-lg size-16 shrink-0"
                          src={item.image}
                        />
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {item.title}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {item.description}
                        </div>
                      </td>
                      <td>
                        <button
                          className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                          onClick={() => setEditBanner(item)}
                        >
                          <FaPencilAlt className="text-yellow-600" />
                        </button>
                        <button
                          className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                          onClick={() => handleDelete(item.service_list_id)}
                        >
                          <FaTrash className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">
                      No data available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurServiceTable;
