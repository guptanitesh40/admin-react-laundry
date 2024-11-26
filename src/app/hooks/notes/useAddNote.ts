import { useState } from "react";
import toast from "react-hot-toast";

const ADD_NOTE_URL = `${import.meta.env.VITE_BASE_URL}/notes`;

const useAddNote = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addNote = async (formData: FormData) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);      

    try {
      const response = await fetch(ADD_NOTE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: 'top-center' });
        return false; 
      }

      toast.success(data.message, { position: 'top-center' });
      return true; 
    } catch (error) {
        toast.error(error?.message || "Error adding note", {
          position: "top-center",
        });
        return false;
      } finally {
        setLoading(false);
      }
  };

  return { addNote, loading };
};

export default useAddNote;
