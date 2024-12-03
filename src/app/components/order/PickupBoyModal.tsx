import { useEffect, useState } from "react";
import * as Yup from "yup";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import { useAssignPickupBoy } from "../../hooks";

interface PickupBoyModalProps {
  orderId: number;
  modelOpen: boolean;
  onClose: () => void;
  setAssigned : (value: boolean) => void;
}

const schema = Yup.object().shape({
  pickup_boy_id: Yup.number().required("Delivery boy is required"),
});

const PickupBoyModal: React.FC<PickupBoyModalProps> = ({
  orderId,
  modelOpen,
  onClose,
  setAssigned,
}) => {
  const { assignPickupBoy, loading } = useAssignPickupBoy();
  const { users, fetchUsersByRole } = useGetUsersByRole();
  const [userSearch, setUserSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [formData, setFormData] = useState({
    order_id: orderId,
    pickup_boy_id: null,
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      await fetchUsersByRole(4, userSearch);
    };
    fetchUserData();
  }, [userSearch, isSearchMode]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
    setIsSearchMode(true);
    if (e.target.value === "") {
      setFormData({
        ...formData,
        pickup_boy_id: null,
      });
    }
  };

  const handleUserClick = (user: any) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    setUserSearch(fullName);
    setIsSearchMode(false);
    setFormData({
      ...formData,
      pickup_boy_id: user.user_id,
    });
  };

  useEffect(() => {
    if (!modelOpen) {
      setUserSearch("");
      setFormData({
        order_id: orderId,
        pickup_boy_id: null,
        comment: "",
      });
      setErrorMessage("");
    }
  }, [modelOpen, orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let success;
    try {
      await schema.validate(formData, { abortEarly: false });

      await assignPickupBoy(formData);

      setAssigned(true);
      onClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      }
    }
  };

  if (!modelOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h2 className="text-2xl font-bold mb-6">Assign Pickup Boy</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative flex flex-col flex-[0_0_40%]">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Delivery Boy Name
            </label>
            <input
              type="text"
              id="username"
              value={userSearch || ""}
              onChange={handleSearchChange}
              className="input border border-gray-300 rounded-md p-2 w-full"
              placeholder="Search delivery boy..."
            />

            {users && userSearch && isSearchMode && (
              <ul className="absolute mt-[68px] bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm">
                {users.length > 0 ? (
                  users.map((user: any) => (
                    <li
                      key={user.user_id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.first_name} {user.last_name} ({user.mobile_number})
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No users found</li>
                )}
              </ul>
            )}
            <p className="text-red-500 text-sm mt-1">
              {errorMessage || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              className="h-20 input border border-gray-300 rounded-md p-2"
              rows={5}
              value={formData.comment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  comment: e.target.value,
                })
              }
            />
          </div>

          <div className="flex mt-4">
            <button type="submit" className="btn btn-primary mr-2">
              Apply
            </button>
            <button type="button" onClick={onClose} className="btn btn-light">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickupBoyModal;
