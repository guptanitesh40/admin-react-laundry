import React, { useState } from "react";
import CategoryModal from "./CategoryModal";
import CategoryTable from "./CategoryTable";
import { usePermissions } from "../../hooks";

const Category: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  const handleAddCategory = () => {
    setEditMode(false);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Category
            </h1>
          </div>

          {hasPermission(5, "create") && (
            <div className="flex items-center gap-2.5">
              <button onClick={handleAddCategory} className="btn btn-primary">
                <i className="ki-filled ki-plus-squared"></i>Add Category
              </button>
            </div>
          )}
          
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <CategoryTable isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
          </div>
        </div>
      </div>

      <CategoryModal
        setIsSubmit={setIsSubmit}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default Category;
