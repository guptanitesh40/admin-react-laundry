import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import ServiceModal from "./ServiceModal";
import { useAddService, useDeleteService, useGetServices, useUpdateService } from "../../hooks";
import Shimmer from "../shimmer/Shimmer";

const Service: React.FC = () => {

  const { services, refetch, loading: loadingService } = useGetServices();
  const { deleteService, loading: deletingService } = useDeleteService();
  const { addService, loading: addingService } = useAddService();
  const { updateService, loading: updatingService } = useUpdateService(refetch);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<any>(null);

  const handleAddService = () => {
    setEditMode(false);
    setModalIsOpen(true);
  };

  const handleEditService = (service: any) => {
    setCurrentService(service);
    setEditMode(true);
    setModalIsOpen(true);
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
    setCurrentService(null);
  };

  const handleDeleteService = async (service_id: number) => {
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
        const { success, message } = await deleteService(service_id);
        if (success) {
          refetch();
          Swal.fire(message);
        } else {
          Swal.fire(message);
        }
      } else {
        Swal.fire("Cancelled", "The Service is safe :)", "info");
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
    <div>
      <div className="card-header border-0 m-auto">
        <h3 className="card-title flex flex-col items-start">
          <span className="card-label font-bold text-gray-700 text-3xl mb-1">
            Services
          </span>
        </h3>
        <div className="card-toolbar">
          <button
            className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold px-2 py-2 rounded-lg shadow-lg hover:shadow-xl"
            onClick={() => handleAddService()}
            disabled={addingService}
          >
            <div className="flex">
              <FaPlus className="mt-1 mr-1" /> Add Service
            </div>
          </button>
        </div>
      </div>

      <div className="card-body py">
        {loadingService ||
        addingService ||
        deletingService ||
        updatingService ? (
          <Shimmer />
        ) : (
          <div className="table-responsive">
            {services === null ? (
              <p className="text-center text-gray-500">No Service available.</p>
            ) : (
              <table className="w-full bg-white rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Service ID</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-12 py-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {services.map((service: any) => (
                    <tr
                      className="hover:bg-gray-50 transition-colors duration-200"
                      key={service.service_id}
                    >
                      <td className="px-6 py-2">{service.service_id}</td>
                      <td className="px-6 py-2">{service.name}</td>
                      <td className="px-6 py-2">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="flex px-9 py-2 justify-end text-end m-auto">
                        <button
                          className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                          onClick={() => handleEditService(service)}
                        >
                          <FaPencilAlt className="text-yellow-600" />
                        </button>

                        <button
                          className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                          onClick={() => handleDeleteService(service.service_id)}
                        >
                          <FaTrash className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <ServiceModal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelClick}
        editMode={editMode}
        currentService={currentService}
        addService={(formData: FormData) => addService(formData)}
        updateService={updateService}
        refetch={refetch}
        loading={addingService || updatingService}
        handleCancelClick={handleCancelClick}
      />
    </div>
  );
};

export default Service;
