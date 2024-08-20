import React, { useState, useRef } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import Shimmer from "../shimmer";
import Swal from 'sweetalert2';
import { useDeleteCategory, useEditCategory, useGetCategories, useSetCategory } from "../../hooks";

Modal.setAppElement("#root");

const Category: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState<string>("");
  const [originalCategoryName, setOriginalCategoryName] = useState<string>("");

  const { categories, loading, refetch } = useGetCategories();
  const { setCategory, loading: saving } = useSetCategory();
  const { deleteCategory, loading: deleting } = useDeleteCategory();
  const { editCategory, loading: editing } = useEditCategory(refetch);

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
      const result = await setCategory(newCategory);
      if (result.success) {
        setNewCategory("");
        setModalIsOpen(false);
        refetch();
      } else {
        toast.error("Failed to add category.", { position: "top-center" });
      }
    } catch (error) {
      toast.error("An error occurred while adding the category.", { position: "top-center" });
    }
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
    setNewCategory("");
  };

  const handleDeleteCategory = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    });

    if (isConfirmed) {
      try {
        const success = await deleteCategory(id);
        if (success) {
          refetch();
          Swal.fire('Deleted!', 'The category has been deleted.', 'success');
        } else {
          toast.error('Failed to delete category.', { position: 'top-center' });
        }
      } catch (error) {
        toast.error('An error occurred while deleting the category.', { position: 'top-center' });
      }
    } else {
      Swal.fire('Cancelled', 'The category is safe :)', 'error');
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
      const success = await editCategory(editingCategoryId!, editingCategoryName);
      if (success) {
        setEditingCategoryId(null);
        setEditingCategoryName("");
        setOriginalCategoryName("");
        refetch();
      } else {
        toast.error("Failed to update category. Please try again.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("An error occurred while updating the category. Please try again.", { position: "top-center" });
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

  return (
    <div className="p-4">
      <div className="card-header border-0 pt-5 mb-4">
        <h3 className="card-title flex flex-col items-start">
          <span className="card-label font-bold text-gray-700 text-3xl mb-1">Category</span>
        </h3>
        <div className="card-toolbar">
          <button
            onClick={handleAddCategoryClick}
            className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold px-2 py-2 rounded-lg shadow-lg hover:shadow-xl"
            disabled={saving}
          >
            + Add Category
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {loading ? (
          <Shimmer />
        ) : (
          <div className="table-responsive">
            {categories.length === 0 ? (
              <p className="text-center text-gray-500">No categories available.</p>
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
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-gray-600 font-medium">{category.id}</td>
                      <td
                        ref={category.id === editingCategoryId ? editableCellRef : null}
                        className="px-6 py-4"
                      >
                        {editingCategoryId === category.id ? (
                          <input
                            type="text"
                            value={editingCategoryName}
                            onChange={(e) => setEditingCategoryName(e.target.value)}
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
                              onClick={() => handleEditClick(category.id, category.name)}
                              className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full"
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelClick}
        contentLabel="Add Category Modal"
        className="fixed inset-1/3 bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category Name"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleSaveClick}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
            disabled={saving}
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg "
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
