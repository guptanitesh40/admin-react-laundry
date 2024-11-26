import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteNote = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteNote = async (note_id: number) => {
    const token = localStorage.getItem("authToken");
    const DELETE_NOTE_URL = `${import.meta.env.VITE_BASE_URL}/notes/${note_id}`;

    setLoading(true);
    try {
      const response = await fetch(DELETE_NOTE_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message, { position: 'top-center' });
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message };

    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteNote, loading }
};

export default useDeleteNote;
