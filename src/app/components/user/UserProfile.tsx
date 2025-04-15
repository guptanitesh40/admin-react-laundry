import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/user/useGetuser";
import { getPaymentStatusLabel } from "../../utils/paymentStatusClasses";
import { Gender, PaymentStatus, PaymentType, Role } from "../../../types/enums";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";
import { LiaRupeeSignSolid } from "react-icons/lia";
import OrderListModal from "./DuoOrderListModal.tsx";
import { getRoleClass } from "../../utils/roleClasses";
import DuoOrderListModal from "./DuoOrderListModal.tsx";
import CustomerOrders from "./CustomerOrders.tsx";
import Loading from "../../components/shimmer/Loading.tsx";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_id = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState<boolean>();
  const [isCustomer, setIsCustomer] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);

  const { userData, fetchUser, count, loading } = useGetUser();

  const user = userData?.user;

  useEffect(() => {
    fetchUser(user_id);
    setRefetch(false);
  }, [user_id, refetch]);

  useEffect(() => {
    setIsCustomer(location.pathname.split("/")[1] === "customer");
  }, [location.pathname]);

  if (!user && loading) {
    return <Loading />;
  }

  if (!user) return;

  const totalKasarAmount = user.orders.reduce(
    (sum: any, order: { kasar_amount: any }) => sum + order.kasar_amount,
    0
  );
  const totalOrderAmount = user.orders.reduce(
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col bg-gray-50 p-5 rounded-md shadow-md">
        <div className="flex justify-between gap-4 items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {user.first_name} {user.last_name}
          </h1>
          {userData?.total_pending_amount !== 0 && (
            <div className="flex flex-end items-center gap-2">
              <span className="text-sm font-medium text-red-700">
                Total Pending Amount: ₹{userData.total_pending_amount}
              </span>
              <button
                className="font-extralight btn btn-lg btn-light"
                onClick={handleModalOpen}
              >
                Pay <LiaRupeeSignSolid size={20} />
              </button>
            </div>
          )}
          {user?.role_id !== 5 && (
            <span
              className={`mt-1 p-2 rounded-md text-sm ${getRoleClass(
                user.role_id
              )}`}
            >
              {Role[user.role_id as unknown as keyof typeof Role]}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5 mt-5">
        <div className="col-span-1">
          <div className="card pb-2.5">
            <div className="card-header">
              <h3 className="card-title">Personal Information</h3>

              <div className="relative group">
                <div
                  className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:flex items-center justify-center whitespace-nowrap"
                  id="tooltip_hover"
                >
                  Edit {isCustomer ? "Customer" : "User"}
                </div>
                <button
                  className="btn btn-light flex justify-center items-center rounded-full p-0 !h-8 !w-8"
                  data-tooltip="#tooltip_hover"
                  data-tooltip-trigger="hover"
                  onClick={() => handleEditUser(user.user_id)}
                >
                  <FaUserEdit className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
                </button>
              </div>
            </div>

            <div className="card-body pt-4 pb-3">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Name:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user.first_name} {user.last_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Email:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Mobile Number:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user.mobile_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Gender:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {Gender[user.gender as unknown as keyof typeof Gender]}
                    </td>
                  </tr>

                  {user?.image !== "" && (
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Profile Photo :
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        <span>
                          <img
                            className="h-14 w-14 rounded-full"
                            src={user.image}
                          />
                        </span>
                      </td>
                    </tr>
                  )}

                  {user.role_id !== 5 && (
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Role:
                      </td>
                      <span
                        className={`mt-1 p-2 rounded-md text-sm ${getRoleClass(
                          user.role_id
                        )}`}
                      >
                        {Role[user.role_id as unknown as keyof typeof Role]}
                      </span>
                    </tr>
                  )}
                  {user?.companies?.length > 0 && (
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Company:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {user.companies
                          .map((company: any) => company)
                          .join(",")}{" "}
                      </td>
                    </tr>
                  )}
                  {user?.branches?.length > 0 && (
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Branch:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {user.branches.map((branch: any) => branch).join(", ")}{" "}
                      </td>
                    </tr>
                  )}
                  {user?.workshops?.length > 0 && (
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Workshop:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {user.workshops
                          .map((workshop: any) => workshop)
                          .join(", ")}{" "}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {user?.role_id === 5 && user && (
        <CustomerOrders user={user} userId={user_id} count={count} />
      )}

      {user?.orders.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-6">
            <div className="col-span-2 lg:col-span-1 flex">
              <div className="card grow">
                <div className="card-header">
                  <h3 className="card-title">Orders Summary</h3>
                </div>
                <div className="card-body pt-4 pb-3">
                  <div className="scrollable-x-auto">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Total Kasar Amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            ₹{totalKasarAmount}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Total Order Amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            ₹{totalOrderAmount}
                          </td>
                        </tr>
                        {userData.total_pending_amount > 0 && (
                          <tr>
                            <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
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
        </div>
      )}

      <DuoOrderListModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={user_id}
        setRefetch={setRefetch}
        count={count}
      />
    </div>
  );
};

export default UserProfile;
