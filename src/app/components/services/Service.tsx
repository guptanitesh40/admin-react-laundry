import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import ServiceTable from "./ServiceTable";

const Service: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleAddService = () => {
    setEditMode(false);
    setModalIsOpen(true);
    setCurrentService(null);
  };

  const handleEditService = (service_id: number) => {
    setEditMode(true);
    setCurrentService(service_id);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Service
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={handleAddService} className="btn btn-primary">
              <i className="ki-filled ki-plus-squared"></i>Add Service
            </button>
          </div>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <ServiceTable
              isSubmit={isSubmit}
              setIsSubmit={setIsSubmit}
              setEditService={handleEditService}
            />
          </div>
        </div>
      </div>

      <ServiceModal
        setIsSubmit={setIsSubmit}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        service_id={currentService}
      />
    </>
  );
};

export default Service;
