import { useEffect, useState } from "react";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import MultiSelect from "multiselect-react-dropdown";
import { useAddWorkshop, useGetWorkshop, useUpdateWorkshop } from "../../hooks";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { workshopSchema } from "../../validation/workshopSchema";

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSubmit: (value: boolean) => void;
  workshop_id?: number;
}

interface FormData {
  workshop_name: string;
  email: string;
  address: string;
  mobile_number: string;
  workshop_managers_ids: any[];
}

const WorkshopModal: React.FC<WorkshopModalProps> = ({
  isOpen,
  onClose,
  setIsSubmit,
  workshop_id,
}) => {
  const formDataState: FormData = {
    workshop_name: "",
    email: "",
    address: "",
    mobile_number: "",
    workshop_managers_ids: [],
  };

  const {
    users,
    fetchUsersByRole,
    loading: fetchingUsers,
  } = useGetUsersByRole();
  const { addWorkshop, loading: adding } = useAddWorkshop();
  const { updateWorkshop, loading: updating } = useUpdateWorkshop();
  const { workshop, fetchWorkshop } = useGetWorkshop();

  const [formData, setFormData] = useState(formDataState);
  const [initialFormData, setInitialFormData] = useState(formDataState);
  const [workshopManagers, setWorkshopManagers] = useState([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (users) {
      const managerData = users.map(
        (user: { user_id: any; first_name: any; last_name: any }) => ({
          workshop_manager_id: user.user_id,
          workshop_manager_name: `${user.first_name} ${user.last_name}`,
        })
      );
      setWorkshopManagers(managerData);
    }
  }, [users]);

  useEffect(() => {
    if (isOpen) {
      const fetchWorkshopManager = async () => {
        fetchUsersByRole(6);
      };
      fetchWorkshopManager();
    }
    if (isOpen && workshop_id) {
      fetchWorkshop(workshop_id);
    }
  }, [isOpen, workshop_id]);

  useEffect(() => {
    if (isOpen && workshop && workshop_id) {
      const fetchedData = {
        workshop_name: workshop.workshop_name,
        address: workshop.address,
        email: workshop.email,
        mobile_number: workshop.mobile_number,
        workshop_managers_ids: workshop.workshopManagerMappings.map(
          (manager) => manager.user_id
        ),
      };
      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    } else {
      setFormData(formDataState);
      setInitialFormData(formDataState);
      setErrors({});
    }
  }, [isOpen, workshop, workshop_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await workshopSchema.validate(formData, { abortEarly: false });

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        onClose();
        return;
      }

      const formattedData = {
        ...formData,
        user_ids: formData.workshop_managers_ids,
      };

      if (workshop_id) {
        await updateWorkshop(workshop_id, formattedData);
      } else {
        await addWorkshop(formattedData);
      }
      setIsSubmit(true);
      onClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          formErrors[err.path || ""] = err.message;
        });
        setErrors(formErrors);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[480px] ban:min-w-[85%] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {workshop_id ? "Update Workshop" : "Add Workshop"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3">
            <div className="col-span-1">
              <label
                htmlFor="workshop_name"
                className="mb-1 block text-gray-700 font-semibold"
              >
                Workshop name
              </label>
              <input
                type="text"
                id="workshop_name"
                name="workshop_name"
                value={formData.workshop_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, workshop_name: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2 w-full"
              />
              <p className="text-red-500 text-sm">
                {errors.workshop_name || "\u00A0"}
              </p>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="address"
                className="mb-1 block text-gray-700 font-semibold"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2 w-full"
              />
              <p className="text-red-500 text-sm">
                {errors.address || "\u00A0"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="mobile_number"
                  className="mb-1 block text-gray-700 font-semibold"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile_number: e.target.value })
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors.mobile_number || "\u00A0"}
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-gray-700 font-semibold"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors.email || "\u00A0"}
                </p>
              </div>
            </div>

            <div className="col-span-1">
              <label className="mb-1 block text-gray-700 font-semibold">
                Workshop manager
              </label>
              <MultiSelect
                options={workshopManagers}
                displayValue="workshop_manager_name"
                selectedValues={
                  formData.workshop_managers_ids
                    ? workshopManagers.filter((option) =>
                        formData.workshop_managers_ids.includes(
                          option.workshop_manager_id
                        )
                      )
                    : []
                }
                isObject={true}
                onSelect={(selectedList) => {
                  setFormData({
                    ...formData,
                    workshop_managers_ids: selectedList.map(
                      (workshop: { workshop_manager_id: any }) =>
                        workshop.workshop_manager_id
                    ),
                  });
                }}
                onRemove={(selectedList) => {
                  setFormData({
                    ...formData,
                    workshop_managers_ids: selectedList.map(
                      (workshop: { workshop_manager_id: any }) =>
                        workshop.workshop_manager_id
                    ),
                  });
                }}
              />
              <p className="text-red-500 text-sm">
                {errors.workshop_managers_ids || "\u00A0"}
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className={`btn btn-primary ${
                  adding || updating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={adding || updating}
              >
                {adding || updating
                  ? adding
                    ? "Adding..."
                    : "Updating..."
                  : workshop_id
                  ? "Update Workshop"
                  : "Add Workshop"}
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
                disabled={adding || updating}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkshopModal;
