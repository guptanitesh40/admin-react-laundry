import { useEffect, useState } from "react";
import {
  useAssignBranch,
  useAssignWorkshop,
  useGetBranches,
  useGetWorkshops,
} from "../../hooks";
import * as Yup from "yup";

interface WorkshopModalProps {
  orderIds: number[];
  workshopModalOpen: boolean;
  onClose: () => void;
  setAssigned: (value: boolean) => void;
  orderStatus: string;
}

const schema = Yup.object().shape({
  option: Yup.number().required("Please select option"),
});

const WorkshopModal: React.FC<WorkshopModalProps> = ({
  orderIds,
  workshopModalOpen,
  onClose,
  setAssigned,
  orderStatus,
}) => {
  const pageNumber = 1;
  const perPage = 1000;

  const { workshops } = useGetWorkshops(pageNumber, perPage);
  const { branches } = useGetBranches(pageNumber, perPage);
  const { assignWorkshop } = useAssignWorkshop();
  const { assignBranch } = useAssignBranch();
  const [selectedOption, setSelectedOption] = useState<number | null>();

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!workshopModalOpen) {
      setSelectedOption(null);
      setErrorMessage("");
    }
  }, [workshopModalOpen, orderIds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate({ option: selectedOption }, { abortEarly: false });

      if (orderStatus === "Assign Workshop") {
        await assignWorkshop(orderIds, selectedOption);
      } else {
        await assignBranch(orderIds, selectedOption);
      }
      onClose();
      setAssigned(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      }
    }
  };

  if (!workshopModalOpen) return false;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {orderStatus === "Assign Workshop"
            ? "Assign Workshop"
            : "Assign Branch"}
        </h2>
        <form onSubmit={handleSubmit}>
          {orderStatus === "Assign Workshop" ? (
            <div className="relative flex flex-col flex-[0_0_40%]">
              <label className="mb-2 font-semibold" htmlFor="workshop_id">
                Workshop
              </label>
              <select
                id="workshop_id"
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={selectedOption ?? ""}
                onChange={(e) => setSelectedOption(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select Workshop
                </option>
                {workshops?.length > 0 ? (
                  workshops.map((workshop) => (
                    <option
                      key={workshop.workshop_id}
                      value={workshop.workshop_id}
                    >
                      {workshop.workshop_name}
                    </option>
                  ))
                ) : (
                  <option>No Data available</option>
                )}
              </select>
              <p className="text-red-500 text-sm mt-1">
                {errorMessage || "\u00A0"}
              </p>
            </div>
          ) : (
            <div className="relative flex flex-col flex-[0_0_40%]">
              <label className="mb-2 font-semibold" htmlFor="branch_id">
                Branch
              </label>
              <select
                id="branch_id"
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={selectedOption ?? ""}
                onChange={(e) => setSelectedOption(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select Branch
                </option>
                {branches?.length > 0 ? (
                  branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.branch_name}
                    </option>
                  ))
                ) : (
                  <option>No Data available</option>
                )}
              </select>
              <p className="text-red-500 text-sm mt-1">
                {errorMessage || "\u00A0"}
              </p>
            </div>
          )}

          <div className="flex mt-4">
            <button type="submit" className="btn btn-primary mr-2">
              Assign
            </button>
            <button type="button" onClick={onClose} className="btn btn-light">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkshopModal;
