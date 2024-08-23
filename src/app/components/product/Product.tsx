import React, { useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useAddProduct,
  useDeleteProduct,
  useGetProduct,
  useUpdateProduct,
} from "../../hooks";
import Shimmer from "../shimmer";
import ProductModal from "./ProductModal";

Modal.setAppElement("#root");

const Product: React.FC = () => {
  const { products, refetch, loading: loadingProduct } = useGetProduct();
  const { addProduct, loading: addingProduct } = useAddProduct();
  const { deleteProduct, loading: deletingProduct } = useDeleteProduct();
  const { updateProduct, loading: updatingProduct } = useUpdateProduct();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const handleAddProduct = () => {
    setEditMode(false);
    setModalIsOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setEditMode(true);
    setModalIsOpen(true);
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (isConfirmed) {
        const { success, message } = await deleteProduct(id);
        if (success) {
          refetch();
          Swal.fire(message);
        } else {
          Swal.fire(message);
        }
      } else {
        Swal.fire("Cancelled", "The product is safe :)", "info");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message ,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="card-header border-0 pt-3 ">
        <h3 className="card-title flex flex-col items-start">
          <span className="card-label font-bold text-gray-700 text-3xl mb-1">
            Products
          </span>
        </h3>
        <div className="card-toolbar">
          <button
            onClick={handleAddProduct}
            className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold px-2 py-2 rounded-lg shadow-lg hover:shadow-xl"
            disabled={addingProduct}
          >
            <div className="flex">
              <FaPlus className="mt-1 mr-1" /> Add Product
            </div>
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {loadingProduct ||
        addingProduct ||
        deletingProduct ||
        updatingProduct ? (
          <Shimmer />
        ) : (
          <div className="table-responsive">
            {products.length === 0 ? (
              <p className="text-center text-gray-500">
                No products available.
              </p>
            ) : (
              <table className="w-full bg-white rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Id</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-12 py-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {products.map((product: any) => (
                    <tr
                      className="hover:bg-gray-50 transition-colors duration-200"
                      key={product.id}
                    >
                      <td className="px-6 py-2">{product.id}</td>
                      <td className="px-6 py-2">{product.name}</td>
                      <td className="px-6 py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="flex px-9 py-2 justify-end text-end m-auto">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                        >
                          <FaPencilAlt className="text-yellow-600" />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                        >
                          <FaTrash className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <ProductModal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelClick}
        editMode={editMode}
        currentProduct={currentProduct}
        addProduct={(formData: FormData) => addProduct(formData)}
        updateProduct={(id: number, formData: FormData) =>
          updateProduct(id, formData)
        }
        refetch={refetch}
        loading={addingProduct || updatingProduct}
        handleCancelClick={handleCancelClick}
      />
    </div>
  );
};

export default Product;
