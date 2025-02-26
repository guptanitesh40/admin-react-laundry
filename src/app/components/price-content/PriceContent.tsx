import { useState } from "react";
import PriceContentModal from "./PriceContentModal";
import PriceContentTable from "./PriceContentTable";
import { usePermissions } from "../../hooks";

const PriceContent: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  const handleAddPriceContent = () => {
    setModalIsOpen(true);
    setCurrentItem(null);
  };

  const handleUpdatePriceContent = (price_content_id: number) => {
    setCurrentItem(price_content_id);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <h1 className="text-xl font-semibold leading-none text-gray-900">
            Price Content
          </h1>
          {hasPermission(11, "create") && (
            <button className="btn btn-primary" onClick={handleAddPriceContent}>
              <i className="ki-filled ki-plus-squared"></i>
              Add Price
            </button>
          )}
        </div>

        <PriceContentTable
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          setUpdateItem={handleUpdatePriceContent}
        />

        <PriceContentModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          price_content_id={currentItem}
          setIsSubmit={setIsSubmit}
        />
      </div>
    </>
  );
};

export default PriceContent;
