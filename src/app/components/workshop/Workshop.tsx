import { useState } from "react";
import WorkshopTable from "./WorkshopTable";
import WorkshopModal from "./WorkshopModal";
import { usePermissions } from "../../hooks";

const Workshop: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  const handleAddWorkshop = () => {
    setModalIsOpen(true);
    setCurrentWorkshop(null);
  };

  const handleUpdateWorkshop = (wokrshop_id: number) => {
    setCurrentWorkshop(wokrshop_id);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Workshop
            </h1>
          </div>

          {hasPermission(15, "create") && (
            <div className="flex items-center gap-2.5">
              <button onClick={handleAddWorkshop} className="btn btn-primary">
                <i className="ki-filled ki-plus-squared"></i>Add Workshop
              </button>
            </div>
          )}

        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <WorkshopTable
              isSubmit={isSubmit}
              setIsSubmit={setIsSubmit}
              setUpdateWorkshop={handleUpdateWorkshop}
            />
          </div>
        </div>
      </div>

      <WorkshopModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        setIsSubmit={setIsSubmit}
        workshop_id={currentWorkshop}
      />
    </>
  );
};

export default Workshop;
