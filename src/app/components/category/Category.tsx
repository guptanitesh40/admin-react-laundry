import React, { useState, useRef } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { FaCheck, FaPencilAlt, FaPlus } from "react-icons/fa";
import Shimmer from "../shimmer";
import Swal from "sweetalert2";
import { useAddCategory, useDeleteCategory, useGetCategories, useUpdateCategory } from "../../hooks";
import CategoryModal from "./CategoryModal";


Modal.setAppElement("#root");

const Category: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [editingCategoryName, setEditingCategoryName] = useState<string>("");
  const [originalCategoryName, setOriginalCategoryName] = useState<string>("");

  const { categories, loading, refetch } = useGetCategories();
  const { addCategory, loading: saving } = useAddCategory();
  const { deleteCategory, loading: deleting } = useDeleteCategory();
  const { updateCategory, loading: editing } = useUpdateCategory(refetch);

  const editableCellRef = useRef<HTMLTableCellElement | null>(null);

  const handleAddCategoryClick = () => {
    setModalIsOpen(true);
  };

  const handleSaveClick = async () => {
    if (newCategory.trim() === "") {
      toast.error("Category name cannot be empty.", { position: "top-center" });
      return;
    }

    try {
      const result = await addCategory(newCategory);
      if (result.success) {
        setNewCategory("");
        setModalIsOpen(false);
        refetch();
      } else {
        toast.error("Failed to add category.", { position: "top-center" });
      }
    } catch (error) {
      toast.error("An error occurred while adding the category.", {
        position: "top-center",
      });
    }
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
    setNewCategory("");
  };

  const handleDeleteCategory = async (id: number) => {
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
        const { success, message } = await deleteCategory(id);
        if (success) {
          refetch();
          Swal.fire(message);
        } else {
          Swal.fire(message);
        }
      } else {
        Swal.fire("Cancelled", "The category is safe :)", "info");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
  
  const handleEditClick = (categoryId: number, categoryName: string) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryName(categoryName);
    setOriginalCategoryName(categoryName);
  };

  const handleSaveEditClick = async () => {
    if (editingCategoryName.trim() === "") {
      toast.error("Category name cannot be empty.", { position: "top-center" });
      return;
    }

    if (editingCategoryName === originalCategoryName) {
      handleCancelEditClick();
      return;
    }

    try {
      const success = await updateCategory(
        editingCategoryId!,
        editingCategoryName
      );
      if (success) {
        setEditingCategoryId(null);
        setEditingCategoryName("");
        setOriginalCategoryName("");
        refetch();
      } else {
        toast.error("Failed to update category. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating the category. Please try again.",
        { position: "top-center" }
      );
    }
  };

  const handleCancelEditClick = () => {
    setEditingCategoryId(null);
    setEditingCategoryName("");
    setOriginalCategoryName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEditClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  return (
    <div>
      <div className="card-header m-auto border-0 mb-">
        <h3 className="card-title flex flex-col items-start">
          <span className="card-label font-bold text-gray-700 text-3xl mb-1">
            Category
          </span>
        </h3>
        <div className="card-toolbar">
          <button
            onClick={handleAddCategoryClick}
            className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold px-2 py-2 rounded-lg shadow-lg hover:shadow-xl"
            disabled={saving}
          >
            <div className="flex">
              <FaPlus className="mt-1 mr-1" /> Add Category
            </div>{" "}
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {loading ? (
          <Shimmer />
        ) : (
          <div className="table-responsive">
            {categories === null ? (
              <p className="text-center text-gray-500">
                No categories available.
              </p>
            ) : (
              <table className="w-full bg-white rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Id</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        {category.id}
                      </td>
                      <td
                        ref={
                          category.id === editingCategoryId
                            ? editableCellRef
                            : null
                        }
                        className="px-6 py-4"
                      >
                        {editingCategoryId === category.id ? (
                          <input
                            type="text"
                            value={editingCategoryName}
                            onChange={(e) =>
                              setEditingCategoryName(e.target.value)
                            }
                            onKeyPress={handleKeyPress}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            autoFocus
                          />
                        ) : (
                          <span className="text-gray-700">{category.name}</span>
                        )}
                      </td>

                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          {editingCategoryId === category.id ? (
                            <button
                              onClick={handleSaveEditClick}
                              className="bg-green-100 hover:bg-green-200 p-2 rounded-full transition-transform transform hover:scale-110"
                              disabled={editing}
                            >
                              <FaCheck className="text-green-600" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleEditClick(category.id, category.name)
                              }
                              className="g-yellow-100 hover:bg-yellow-200 p-2 rounded-full"
                            >
                              <FaPencilAlt className="text-yellow-600" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                            disabled={deleting}
                          >
                            <i className="ki-filled ki-trash text-red-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <CategoryModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        addCategory={addCategory}
        refetch={refetch}
        saving={saving}
      />
    </div>
  );
};

export default Category;
