import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/user/useGetuser";
import { Gender, Role } from "../../../types/enums";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { getRoleClass } from "../../utils/roleClasses";
import DuoOrderListModal from "./DuoOrderListModal.tsx";
import CustomerOrders from "./CustomerOrders.tsx";
import Loading from "../../components/shimmer/Loading.tsx";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { usePermissions, useRestoreUser } from "../../hooks/index.ts";
import Swal from "sweetalert2";
import CustomerAddress from "./CustomerAddress.tsx";
import AddressModal from "./address/AddressModel.tsx";
import toast from "react-hot-toast";
import { useDeleteAddress } from "../../hooks/address/useDeleteAddress.ts";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_id = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState<boolean>();
  const [isCustomer, setIsCustomer] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);

  const [addressModelIsOpen, setAddressModelIsOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { userData, fetchUser, count, loading } = useGetUser();
  const { restoreUser } = useRestoreUser();
  const { deleteAddress } = useDeleteAddress();

  const user = userData?.user;

  const { hasPermission } = usePermissions();

  useEffect(() => {
    fetchUser(user_id);
    setRefetch(false);
  }, [user_id, refetch]);

  useEffect(() => {
    setIsCustomer(location.pathname.split("/")[1] === "customer");
  }, [location.pathname]);

  if (!user) return;

  const totalKasarAmount = user?.orders?.reduce(
    (sum: any, order: { kasar_amount: any }) => sum + order.kasar_amount,
    0
  );
  const totalOrderAmount = user?.orders?.reduce(
    (sum: any, order: { total: any }) => sum + order.total,
    0
  );

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleEditUser = (user_id: number) => {
    navigate(
      isCustomer ? `/customer/edit/${user_id}` : `/user/edit/${user_id}`
    );
  };

  const handleRestoreUser = async (user_id: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: isCustomer
          ? "You want to restore this customer?"
          : "You want to restore this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, restore it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: isCustomer ? "Restoring customer..." : "Restoring user...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const { success, message } = await restoreUser(user_id);
        setRefetch(true);

        if (success) {
          Swal.fire("Restored!", message, "success");
        } else {
          Swal.fire("Failed", message, "error");
        }
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleAddressDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this address!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const result = await deleteAddress(id);

      Swal.close();

      if (result.success) {
        Swal.fire({
          title: "Deleted!",
          text: result.message,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setRefetch(true);
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  const handleAddressEdit = (id: number) => {
    const address = user?.address.find((addr: any) => addr.address_id === id);
    if (address) {
      setSelectedAddress(address);
      setAddressModelIsOpen(true);
    } else {
      toast.error(`Address with id ${id} not found`);
    }
  };

  const handleAddresSelect = (address: any) => {
    if (address) {
      setRefetch(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const isDeleted = !!user?.deleted_at;

  return (
    <div className="container p-6 mx-auto">
      <div className="flex flex-col p-5 rounded-md shadow-md bg-gray-50">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            {user?.first_name} {user?.last_name}
          </h1>
          {userData?.total_pending_amount !== 0 && (
            <div className="flex items-center gap-2 flex-end">
              <span className="text-sm font-medium text-red-700">
                Total Pending Amount: ₹{userData?.total_pending_amount}
              </span>
              <button
                className="font-extralight btn btn-lg btn-light"
                onClick={handleModalOpen}
              >
                Pay <LiaRupeeSignSolid size={20} />
              </button>
            </div>
          )}

          {isDeleted ? (
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleRestoreUser(user?.user_id)}
            >
              Restore {isCustomer ? "Customer" : "User"}
            </button>
          ) : (
            user.role_id !== 5 && (
              <span
                className={`mt-1 p-2 rounded-md text-sm ${getRoleClass(
                  user.role_id
                )}`}
              >
                {Role[user.role_id as keyof typeof Role]}
              </span>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5 mt-5 items-stretch">
        <div className="col-span-1">
          <div className="card pb-2.5">
            <div className="card-header">
              <h3 className="card-title">Personal Information</h3>
              {!isDeleted && hasPermission(8, "update") && (
                <div className="relative group">
                  <div
                    className="absolute items-center justify-center hidden mb-1 transform -translate-x-1/2 tooltip bottom-full left-1/2 group-hover:flex whitespace-nowrap"
                    id="tooltip_hover"
                  >
                    Edit {isCustomer ? "Customer" : "User"}
                  </div>
                  <button
                    className="btn btn-light flex justify-center items-center rounded-full p-0 !h-8 !w-8"
                    data-tooltip="#tooltip_hover"
                    data-tooltip-trigger="hover"
                    onClick={() => handleEditUser(user?.user_id)}
                  >
                    <FaUserEdit className="w-5 h-5 text-gray-600 transition-colors duration-300 group-hover:text-gray-800" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 pb-3 card-body">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                      Name:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user?.first_name} {user?.last_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                      Email:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user?.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                      Mobile Number:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user?.mobile_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                      Gender:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {Gender[user?.gender as unknown as keyof typeof Gender]}
                    </td>
                  </tr>

                  {user?.image !== "" && (
                    <tr>
                      <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                        Profile Photo :
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        <span>
                          <img
                            className="rounded-full h-14 w-14"
                            src={user?.image}
                          />
                        </span>
                      </td>
                    </tr>
                  )}

                  {user?.role_id !== 5 && (
                    <tr>
                      <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                        Role:
                      </td>

                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        <span
                          className={`p-2 rounded-md text-sm ${getRoleClass(
                            user?.role_id
                          )}`}
                        >
                          {Role[user?.role_id as unknown as keyof typeof Role]}
                        </span>
                      </td>
                    </tr>
                  )}
                  {user?.companies?.length > 0 && (
                    <tr>
                      <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                        Company:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {Array.isArray(user?.companies) &&
                        user.companies.length > 0
                          ? user.companies
                              .map((company: any) => company)
                              .join(",")
                          : ""}
                      </td>
                    </tr>
                  )}
                  {user?.branches?.length > 0 && (
                    <tr>
                      <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                        Branch:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {Array.isArray(user.branches) &&
                        user.branches.length > 0
                          ? user.branches
                              .map((branch: any) => branch)
                              .join(", ")
                          : ""}
                      </td>
                    </tr>
                  )}
                  {user?.workshops?.length > 0 && (
                    <tr>
                      <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                        Workshop:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {Array.isArray(user.workshops) &&
                        user.workshops.length > 0
                          ? user.workshops
                              .map((workshop: any) => workshop)
                              .join(", ")
                          : ""}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {user?.orders?.length > 0 && (
          <div className="space-y-6">
            <div className="flex h-full col-span-2 lg:col-span-1">
              <div className="card grow">
                <div className="card-header">
                  <h3 className="card-title">Orders Summary</h3>
                </div>
                <div className="pt-4 pb-3 card-body">
                  <div className="scrollable-x-auto">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                            Total Kasar Amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            ₹{totalKasarAmount}
                          </td>
                        </tr>
                        <tr>
                          <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                            Total Order Amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            ₹{totalOrderAmount}
                          </td>
                        </tr>
                        {userData.total_pending_amount > 0 && (
                          <tr>
                            <td className="pb-5 text-sm font-medium text-gray-500 min-w-36 pe-6">
                              Total Pending Amount:
                            </td>
                            <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                              ₹{userData.total_pending_amount}
                            </td>
                            <td>
                              <span className="relative bottom-2 left-4">
                                <button
                                  className="flex items-center gap-2.5 font-extralight btn btn-light "
                                  onClick={handleModalOpen}
                                >
                                  Pay <LiaRupeeSignSolid size={20} />
                                </button>
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {user?.role_id === 5 && user && (
        <>
          <CustomerAddress
            addresses={user?.address}
            onAdd={() => {
              setAddressModelIsOpen(true);
              setSelectedAddress(null);
            }}
            onEdit={(id) => handleAddressEdit(id)}
            onDelete={(id) => {
              handleAddressDelete(id);
            }}
          />
          <CustomerOrders user={user} userId={user_id} count={count} />
        </>
      )}

      <DuoOrderListModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={user_id}
        setRefetch={setRefetch}
        count={count}
      />

      {addressModelIsOpen && (
        <AddressModal
          isOpen={addressModelIsOpen}
          onAddressAdded={handleAddresSelect}
          setIsSubmit={setIsSubmit}
          onClose={() => setAddressModelIsOpen(false)}
          userId={user?.user_id}
          fullname={`${user?.first_name} ${user?.last_name}`}
          address={selectedAddress}
        />
      )}
    </div>
  );
};

export default UserProfile;
