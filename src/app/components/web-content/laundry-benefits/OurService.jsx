import { useState } from "react";
import BannerTable from "./OurServiceTable";
import OurServiceModal from "./OurServiceModal";

const OurService = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRecord, serCurrentRecord] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleAddBanner = () => {
    setEditMode(false);
    serCurrentRecord(null);
    setModalIsOpen(true);
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
              Choose Us
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={handleAddBanner} className="btn btn-primary">
              <i className="ki-filled ki-plus-squared"></i>Add Card
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
          isEdit={editMode}
          onClose={() => setModalIsOpen(false)}
          banner_id={null}
          data={currentRecord}
        />
      )}
    </>
  );
};

export default OurService;
