import React, { useEffect } from "react";
import { Gender, Role } from "../../../types/enums";
import useGetUser from "../../hooks/user/useGetuser";
import { RootState } from "../../utils/store";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user_id);
  const { userData, fetchUser } = useGetUser();

  const user = userData?.user;

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser(userId);
    };
    fetchData();
  }, [userId]);

  if (!user) return;

  return (
    <>
      <main className="grow content" id="content" role="content">
        <div className="container-fixed">
          <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-xl font-semibold leading-none text-gray-900">
                Profile
              </h1>
            </div>
          </div>
        </div>

        <div className="container-fixed">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
            <div className="col-span-1">
              <div className="grid gap-5 lg:gap-7.5">
                <div className="card min-w-full">
                  <div className="card-header">
                    <h3 className="card-title">Personal Info</h3>
                    <div className="text-gray-700">
                      <span className="badge badge-lg badge-outline badge-danger">
                        {Role[user.role_id as unknown as keyof typeof Role]}
                      </span>
                    </div>
                  </div>

                  <div className="card-table scrollable-x-auto pb-3">
                    <table className="table align-middle text-sm text-gray-500">
                      <tbody>
                        {/* {!!user.image && (
                          <tr>
                            <td className="py-2 min-w-28">Photo</td>

                            <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                              <span className="">
                                <img
                                  className="h-14 w-14 rounded-full object-cover"
                                  src={user.image || "/media/images/blank.png"}
                                  alt="User profile"
                                />
                              </span>
                            </td>
                          </tr>
                        )} */}
                        <tr>
                          <td className="py-2">Name</td>
                          <td className="py-2 text-gray-700 text-sm">
                            {user.first_name} {user.last_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 min-w-36">Email</td>
                          <td className="py-2 min-w-60">{user.email}</td>
                        </tr>
                        <tr>
                          <td className="py-2 min-w-36">Mobile Number</td>
                          <td className="py-2 min-w-60">
                            {user.mobile_number}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3">Gender</td>
                          <td className="py-3 text-gray-700 text-sm">
                            {
                              Gender[
                                user.gender as unknown as keyof typeof Gender
                              ]
                            }
                          </td>
                        </tr>
                        {user?.companies?.length > 0 && (
                          <tr>
                            <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                              Company:
                            </td>
                            <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                              {user.companies
                                .map((company: any) => company)
                                .join(", ")}{" "}
                            </td>
                          </tr>
                        )}
                        {user?.branches?.length > 0 && (
                          <tr>
                            <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                              Branch:
                            </td>
                            <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                              {user.branches
                                .map((branch: any) => branch)
                                .join(", ")}{" "}
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
