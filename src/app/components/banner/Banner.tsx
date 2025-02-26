import React, { useState } from "react";
import BannerTable from "./BannerTable";
import BannerModal from "./BannerModal";
import { usePermissions } from "../../hooks";

const Banner: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentBanner, setCurrentBanner] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  const handleAddBanner = () => {
    setEditMode(false);
    setModalIsOpen(true);
    setCurrentBanner(null);
  };

  const handleEditBanner = (banner_id: number) => {
    setEditMode(true);
    setCurrentBanner(banner_id);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Banner
            </h1>
          </div>

          {hasPermission(14, "create") && (
            <div className="flex items-center gap-2.5">
              <button onClick={handleAddBanner} className="btn btn-primary">
                <i className="ki-filled ki-plus-squared"></i>Add Banner
              </button>
            </div>
          )}
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

      <BannerModal
        setIsSubmit={setIsSubmit}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        banner_id={currentBanner}
      />
    </>
  );
};

export default Banner;
