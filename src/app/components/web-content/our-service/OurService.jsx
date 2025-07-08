import { useState } from "react";
import toast from "react-hot-toast";
import BannerTable from "./OurServiceTable";
import OurServiceModal from "./OurServiceModal";

const OurService = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRecord, serCurrentRecord] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleAddBanner = () => {
    setEditMode(false);
    setModalIsOpen(true);
    setCurrentBanner(null);
  };

  const handleEditBanner = (item) => {
    serCurrentRecord(item);
    setEditMode(true);
    setModalIsOpen(true);
  };
  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Our Service
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={handleAddBanner} className="btn btn-primary">
              <i className="ki-filled ki-plus-squared"></i>Add Our Service
            </button>
          </div>
        </div>
      </div>
      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <BannerTable
              isSubmit={isSubmit}
              setIsSubmit={setIsSubmit}
              setEditBanner={handleEditBanner}
            />
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <OurServiceModal
          setIsSubmit={setIsSubmit}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          banner_id={currentBanner}
        />
      )}
    </>
  );
};

export default OurService;
