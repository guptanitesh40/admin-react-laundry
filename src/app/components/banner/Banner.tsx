import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDeleteBanner, useGetBanner } from "../../hooks";
import ListShimmer from "../shimmer/ListShimmer";
import Swal from "sweetalert2";
import { useState } from "react";
import BannerModal from "./BannerModal";
import BannerShimmer from "../shimmer/BannerShimmer";

const Banner: React.FC = () => {
  const { deleteBanner } = useDeleteBanner();
  const { banners, refetch, loading: loadingBanner } = useGetBanner();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentBanner, setCurrentBanner] = useState<any>(null);

  const handleAddBanner = () => {
    setEditMode(false);
    setModalIsOpen(true);
    setCurrentBanner(null); 
  };

  const handleEditBanner = (banner: any) => {
    setEditMode(true);
    setCurrentBanner(banner); 
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setCurrentBanner(null);
  };

  const handleDeleteBanner = async (banner_id: number) => {
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
        const { success, message } = await deleteBanner(banner_id);
        if (success) {
          await refetch();
          Swal.fire("Deleted!", message, "success");
        } else {
          Swal.fire("Error!", message, "error");
        }
      } else {
        Swal.fire("Cancelled", "The banner is safe :)", "info");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };


  return (
    <div className="container-fixed">
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap items-center gap-5 justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Banners</h1>
  
          <div className="flex gap-5">
            <button className="btn btn-success" onClick={handleAddBanner}>
              <i className="ki-filled ki-plus-squared"></i>
              Add Banner
            </button>
          </div>
        </div>
  
        <div>
          {banners.length === null ? (
            <div className="text-center text-xl text-gray-600">
              <p>No banners available</p>
            </div>
          ) : (
            <div className="grid gap-5 lg:gap-7.5">
              <div className="fix card card-grid min-w-full">
              
                <div data-datatable="true" data-datatable-page-size="10">
                  <div className="scrollable-x-auto fix">
                    <table
                      className="table table-auto table-border rounded-[20px]"
                      data-datatable-table="true"
                    >
                      <thead>
                        <tr>
                          <th className="w-[60px]">ID</th>
                          <th className="min-w-[200px]">Image</th>
                          <th className="min-w-[165px]">Title</th>
                          <th className="min-w-[205px] truncate break-words">Description</th>
                          <th className="min-w-[100px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loadingBanner ? (
                          <tr>
                            <td colSpan={5}>
                              <BannerShimmer />
                            </td>
                          </tr>
                        ) : (
                          banners.map((banner) => (
                            <tr key={banner.banner_id}>
                              <td>
                                <div className="flex items-center gap-2.5">
                                  {banner.banner_id}
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center gap-2.5">
                                  <img
                                    alt={banner.title}
                                    className="rounded-lg size-20 shrink-0"
                                    src={banner.image}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center gap-2.5">
                                  {banner.title}
                                </div>
                              </td>
                              <td className="whitespace-normal overflow-hidden max-w-[105px]">
                                <div className="break-words overflow-hidden">
                                  {banner.description}
                                </div>
                              </td>
                              <td>
                                <button
                                  className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                                  onClick={() => handleEditBanner(banner)}
                                >
                                  <FaPencilAlt className="text-yellow-600" />
                                </button>
                                <button
                                  className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                                  onClick={() => handleDeleteBanner(banner.banner_id)}
                                >
                                  <FaTrash className="text-red-500" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  
      <BannerModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        refetch={refetch}
        bannerData={currentBanner}
        banner_id={currentBanner?.banner_id}
      />
    </div>
  );
  
};

export default Banner;
