import { useEffect, useState } from "react";
import { useAssignWorkshop, useGetWorkshops } from "../../hooks";
import * as Yup from "yup";

interface WorkshopModalProps {
  orderId: number;
  workshopModalOpen: boolean;
  onClose: () => void;
  setAssigned: (value: boolean) => void;
}

const schema = Yup.object().shape({
  workshop_id: Yup.number().required("Please select workshop to assign"),
});

const WorkshopModal: React.FC<WorkshopModalProps> = ({
  orderId,
  workshopModalOpen,
  onClose,
  setAssigned,
}) => {
  const perNumber = 1;
  const perPage = 1000;

  const { workshops } = useGetWorkshops(perNumber, perPage);
  const { assignWorkshop } = useAssignWorkshop();
  const [workshop, setWorkshop] = useState<number | null>();

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!workshopModalOpen) {
      setWorkshop(null);
      setErrorMessage("");
    }
  }, [workshopModalOpen, orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate({ workshop_id: workshop }, { abortEarly: false });

      if (workshop !== null) {
        const success = await assignWorkshop(orderId, workshop);
        if (success) {
          onClose();
          setAssigned(true);
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      }
    }
  };

  if (!workshopModalOpen) return false;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
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
        <h2 className="text-2xl font-bold mb-6">Assign Workshop</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative flex flex-col flex-[0_0_40%]">
            <label className="mb-2 font-semibold" htmlFor="company_id">
              Workshop
            </label>
            <select
              id="workshop_id"
              className="select border border-gray-300 rounded-md p-2 w-full text-sm"
              value={workshop ?? ""}
              onChange={(e) => setWorkshop(Number(e.target.value))}
            >
              <option value="" disabled selected>
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
