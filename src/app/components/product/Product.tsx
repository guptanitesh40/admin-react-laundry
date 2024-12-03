import React, { useState } from "react";
import ProductModal from "./ProductModal";
import ProductTable from "./ProductTable";

const Product: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleAddProduct = () => {
    setEditMode(false);
    setModalIsOpen(true);
    setCurrentProduct(null);
  };

  const handleEditProduct = (product_id: number) => {
    setEditMode(true);
    setCurrentProduct(product_id);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Product
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={handleAddProduct} className="btn btn-primary">
              <i className="ki-filled ki-plus-squared"></i>Add Product
            </button>
          </div>
        </div>
      </div>

        <div className="container-fixed">
          <div className="grid gap-5 lg:gap-7.5">
            <div className="card card-grid min-w-full">
              <ProductTable
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
                setEditProduct={handleEditProduct}
              />
            </div>
          </div>
        </div>

        <ProductModal
          setIsSubmit={setIsSubmit}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          product_id={currentProduct}
        />
    </>
  );
};

export default Product;
