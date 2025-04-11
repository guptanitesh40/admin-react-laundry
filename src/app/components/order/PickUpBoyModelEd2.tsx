/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useAssignPickupBoy } from "../../hooks";
import useAssignDeliveryBoy from "../../hooks/orderstatus/useAssignDeliveryBoy";
import useGetDeliveryPickupBoys from "../../hooks/user/useGetDeliveryPickupBoys";

interface PickUpBoyModelEd2Props {
  orderId: number;
  isDelivery: boolean;
  pickupBoyId: number;
  deliveryBoyId: number;
  setModelOpen: (value: boolean) => void;
  setAssigned: (value: boolean) => void;
}

const schema = Yup.object().shape({
  pickup_boy_id: Yup.number().required("Please select a name to assign"),
});

const PickUpBoyModelEd2: React.FC<PickUpBoyModelEd2Props> = ({
  orderId,
  isDelivery,
  pickupBoyId,
  deliveryBoyId,
  setModelOpen,
  setAssigned,
}) => {
  const { users, loading, fetchDeliveryPickupBoys } =
    useGetDeliveryPickupBoys();
  const { assignPickupBoy } = useAssignPickupBoy();
  const { assignDeliveryBoy, loading: assigning } = useAssignDeliveryBoy();
  const [userSearch, setUserSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [formData, setFormData] = useState({
    order_ids: orderId,
    pickup_boy_id: deliveryBoyId,
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [focusOn, setFocusOn] = useState<boolean>(false);
  const [isSet, setIsSet] = useState<boolean>(false);

  const handleSearchChange = (e: any) => {
    fetchDeliveryPickupBoys(e.target.value);
    setUserSearch(e.target.value);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsSearchMode(false);
        setFocusOn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    let success;
    try {
      await schema.validate(formData, { abortEarly: false });
      if (isDelivery) {
        const formattedData = {
          order_ids: [formData.order_ids],
          delivery_boy_id: formData.pickup_boy_id,
        };
        await assignDeliveryBoy(formattedData);

      }
      setAssigned(true);
      handleClose();

      // if (orderStatus === "Assign Delivery boy") {
      //   const formattedData = {
      //     order_ids: formData.order_ids,
      //     delivery_boy_id: formData.pickup_boy_id,
      //   };

      //   await assignDeliveryBoy(formattedData);
      // } else {
      //   await assignPickupBoy(formData);
      // }

      // setAssigned(true);
      // onClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      }
    }
  };

  const handleClose = () => {
    setModelOpen(false);
  };

  useEffect(() => {
    if (users && !isSet) {
      const existingUser = users.find(
        (user: any) => user.user_id === deliveryBoyId
      );
      if (existingUser) {
        const fullName = `${existingUser.first_name} ${existingUser.last_name}`;
        setUserSearch(fullName);
        setIsSet(true);
      }
    }
  }, [users]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] z-10 relative">
        {!users && loading && (
          <div className="absolute inset-0 bg-black bg-opacity-10 grid place-items-center z-[100]">
            <span className="flex justify-center items-center gap-2 px-3 py-2 bg-white rounded">
              <span className="inline-block h-6 w-6 rounded-full border-4 border-primary !border-t-black/5 animate-spin"></span>
              <span className="text-gray-500 text-sm font-semibold">
                Loading...
              </span>
            </span>
          </div>
        )}

        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={handleClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h2 className="text-2xl font-bold mb-6">
          {isDelivery ? "Update Delivery Boy" : "Update Pickup Boy"}
        </h2>

        {/* form onSubmit={onSearchSubmit} className="flex items-center gap-2">
              <label className="input input-sm h-10 flex items-center gap-2">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    if (e.target.value === "") {
                      setSearch("");
                    }
                  }}
                  placeholder="Search..."
                  className="min-w-[185px]"
                />
                <button type="submit" className="btn btn-sm btn-icon">
                  <i className="ki-filled ki-magnifier"></i>
                </button>
              </label>
            </form>
            <p className="text-red-500 text-sm mt-1">
              {errorMessage || "\u00A0"} */}

        <div>
          <form
            className="relative flex flex-col flex-[0_0_40%]"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Name
            </label>
            <label className="input input-sm h-10 flex items-center gap-2">
              <input
                type="search"
                ref={inputRef}
                autoComplete="off"
                value={userSearch}
                placeholder="Search..."
                className="min-w-[185px] text-sm"
                onChange={handleSearchChange}
                onFocus={() => {
                  setFocusOn(true);
                  setIsSearchMode(true);
                }}
              />
            </label>
            {users && isSearchMode && (
              <ul
                ref={dropdownRef}
                className="absolute mt-[64px] bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm"
              >
                {users.length > 0 ? (
                  users.map((user: any) => (
                    <li
                      key={user.user_id}
                      className={`p-2 hover:bg-gray-200 cursor-pointer rounded ${
                        formData.pickup_boy_id === user.user_id
                          ? "bg-gray-200"
                          : ""
                      }`}
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
          </form>
          <div className="flex mt-4">
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={handleSubmit}
              disabled={assigning}
            >
              Assign
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUpBoyModelEd2;
