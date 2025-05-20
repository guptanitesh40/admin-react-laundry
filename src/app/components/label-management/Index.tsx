import React, { useState } from "react";
import LablesTable from "./LablesTable";
import toast from "react-hot-toast";

const Index: React.FC = () => {
  const [label, setLabel] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refetchLabels, setRefetchLabels] = useState<boolean>(false);

  const handleAddLabel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("authToken");

    if (!label.trim()) {
      setError("Label value is required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await fetch(`${BASE_URL}/label`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label_name: label,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(
          data.message || "Failed to add label, please try again later."
        );
      }

      toast.success(data.message || "Label Added Successfully");
      setLabel("");
    } catch (error: any) {
      toast.error(error.message || "Failed to add label.");
    } finally {
      setLoading(false);
      setRefetchLabels((prev) => !prev);
    }
  };

  return (
    <main className="grow content" id="content" role="content">
      <div className="container-fixed relative">
        <div className="pb-7.5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-5 py-2.5">
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-xl font-semibold leading-none text-gray-900">
                Label Management
              </h1>
            </div>
          </div>

          <div className="bg-gray-200 px-4 py-3 border border-gray-300 rounded-md">
            <form
              onSubmit={handleAddLabel}
              className="flex flex-col gap-3 items-start"
            >
              <label
                htmlFor="new_label"
                className="form-label text-sm font-semibold"
              >
                Enter new label
              </label>
              <div className="w-full space-y-1">
                <input
                  id="new_label"
                  type="text"
                  className="input"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="h-5.5 w-5.5 border-4 border-white/40 border-t-white border-r-white rounded-full animate-spin"></span>
                    Adding..
                  </>
                ) : (
                  "Add Label"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <LablesTable
              refetchLabels={refetchLabels}
              setRefetchLabels={setRefetchLabels}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
