import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDeleteBanner, useGetBanner } from "../../hooks";
import BannerShimmer from "../shimmer/BannerShimmer";
import Swal from "sweetalert2";
import { useState } from "react";
import BannerModal from "./BannerModal";

const Banner: React.FC = () => {
  const { deleteBanner } = useDeleteBanner();
  const { banners, refetch, loading } = useGetBanner();

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
      {loading ? (
        <BannerShimmer />
      ) : (
        <>
          <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-xl font-semibold leading-none text-gray-900 py-3">
                Banners
              </h1>
            </div>
            <button className="btn btn-primary" onClick={handleAddBanner}>
              <i className="ki-filled ki-plus-squared"></i> Add Banner
            </button>
          </div>

          <div className="grid gap-5 lg:gap-7.5">
            <div className="card card-grid min-w-full">
              <div className="card-body">
                <div className="scrollable-x-auto">
                  <table className="table table-auto table-border">
                    <thead>
                      <tr>
                        <th className="w-[60px]">ID</th>
                        <th className="min-w-[200px]">Image</th>
                        <th className="min-w-[165px]">Title</th>
                        <th className="min-w-[205px]">Description</th>
                        <th className="w-[125px]">Actions</th>
                      </tr>
                    </thead>
                    {banners.length > 0 ? (
                      <tbody>
                        {banners.map((banner) => (
                          <tr key={banner.banner_id}>
                            <td>{banner.banner_id}</td>
                            <td>
                              <img
                                alt={banner.title}
                                className="rounded-lg size-20 shrink-0"
                                src={banner.image}
                              />
                            </td>
                            <td>{banner.title}</td>
                            <td className="max-w-[105px] break-words overflow-hidden">
                              {banner.description}
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
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan={5} className="text-center">
                            No banners available
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
      )}

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
