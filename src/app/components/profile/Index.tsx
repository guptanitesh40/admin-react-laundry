/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Gender, Role } from "../../../types/enums";
import useGetUser from "../../hooks/user/useGetuser";
import { RootState } from "../../utils/store";
import { useSelector } from "react-redux";
import { useUpdateUser } from "../../hooks";

const BLANK = "/media/images/blank.png";

const Profile: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.user_id);
  const { userData, fetchUser, loading } = useGetUser();
  const { updateUser } = useUpdateUser();

  const user = userData?.user;

  const [preview, setPreview] = useState("/media/images/blank.png");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const payLoadFormData = new FormData();
      payLoadFormData.append("image", file);
      const status = await updateUser(userId, payLoadFormData);
      if (!status) {
        setPreview("/media/images/blank.png");
      }
    }
  };

  const handleRemoveImage = async () => {
    setPreview("/media/images/blank.png");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (userData?.user?.image) {
      setPreview(userData?.user?.image);
    }
  }, [user]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser(userId);
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <main className="grow content" id="content" role="content">
        <div className="container-fixed">
          <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
            <span className="inline-block h-[21px] w-[61.87px] bg-gray-200 animate-pulse rounded"></span>
          </div>
        </div>
        <div className="container-fixed">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
            <div className="col-span-1">
              <div className="grid gap-5 lg:gap-7.5">
                <div className="card min-w-full">
                  <div className="card-header">
                    <span className="inline-block w-[103.84px] h-6 bg-gray-200 animate-pulse rounded"></span>
                    <span className="inline-block w-[86.5px] h-7 bg-gray-200 animate-pulse rounded"></span>
                  </div>
                  <div className="card-table scrollable-x-auto pb-3">
                    <table className="table align-middle text-sm text-gray-500">
                      <tbody>
                        <tr>
                          <td className="!py-2">
                            <span className="inline-block h-7 w-[150px] bg-gray-200 animate-pulse rounded"></span>
                          </td>
                          <td className="!py-2">
                            <span className="inline-block h-16 w-16 bg-gray-200 rounded-full animate-pulse"></span>
                          </td>
                        </tr>
                        {Array.from({ length: 4 }).map((_, index) => {
                          return (
                            <tr key={index}>
                              <td className="!py-2">
                                <span className="inline-block h-7 w-[150px] bg-gray-200 animate-pulse rounded"></span>
                              </td>
                              <td className="!py-2">
                                <span className="inline-block h-7 w-[150px] bg-gray-200 animate-pulse rounded"></span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
                        <tr>
                          <td className="py-2 min-w-28">Photo</td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            <div
                              className="relative image-input size-16"
                              data-image-input="true"
                            >
                              <input
                                ref={fileInputRef}
                                accept=".png,.jpg,.jpeg"
                                name="avatar"
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                              <input name="avatar_remove" type="hidden" />

                              {!preview &&
                                preview !== "/media/images/blank.png" && (
                                  <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="btn btn-icon btn-icon-xs btn-light shadow-default absolute z-1 size-5 -top-0.5 -right-0.5 rounded-full"
                                    data-image-input-remove
                                    data-tooltip="#image_input_tooltip"
                                    data-tooltip-trigger="hover"
                                  >
                                    <i className="ki-filled ki-cross"></i>
                                  </button>
                                )}

                              <span
                                className="tooltip"
                                id="image_input_tooltip"
                              >
                                Click to remove or revert
                              </span>

                              <div
                                role="button"
                                tabIndex={0}
                                onClick={openFileDialog}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && openFileDialog()
                                }
                                className={`image-input-placeholder rounded-full border-2 cursor-pointer ${
                                  preview
                                    ? "border-success"
                                    : " border-gray-300"
                                }`}
                                style={{
                                  backgroundImage: `url(${preview || BLANK})`,
                                }}
                              >
                                {preview && (
                                  <div
                                    className="image-input-preview rounded-full"
                                    style={{
                                      backgroundImage: `url(${preview})`,
                                    }}
                                  />
                                )}

                                <div
                                  className={`flex items-center justify-center h-5 left-0 right-0 bottom-0  absolute pointer-events-none ${
                                    preview === "/media/images/blank.png"
                                      ? "bg-dark-clarity"
                                      : "bg-white/50"
                                  }`}
                                >
                                  <svg
                                    className="fill-light opacity-80"
                                    height="12"
                                    viewBox="0 0 14 12"
                                    width="14"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.6665 2.64585H11.2232C11.0873 2.64749 10.9538 2.61053 10.8382 2.53928C10.7225 2.46803 10.6295 2.36541 10.5698 2.24335L10.0448 1.19918C9.91266 0.931853 9.70808 0.707007 9.45438 0.550249C9.20068 0.393491 8.90806 0.311121 8.60984 0.312517H5.38984C5.09162 0.311121 4.799 0.393491 4.5453 0.550249C4.2916 0.707007 4.08701 0.931853 3.95484 1.19918L3.42984 2.24335C3.37021 2.36541 3.27716 2.46803 3.1615 2.53928C3.04584 2.61053 2.91234 2.64749 2.7765 2.64585H2.33317C1.90772 2.64585 1.49969 2.81486 1.19885 3.1157C0.898014 3.41654 0.729004 3.82457 0.729004 4.25002V10.0834C0.729004 10.5088 0.898014 10.9168 1.19885 11.2177C1.49969 11.5185 1.90772 11.6875 2.33317 11.6875H11.6665C12.092 11.6875 12.5 11.5185 12.8008 11.2177C13.1017 10.9168 13.2707 10.5088 13.2707 10.0834V4.25002C13.2707 3.82457 13.1017 3.41654 12.8008 3.1157C12.5 2.81486 12.092 2.64585 11.6665 2.64585ZM6.99984 9.64585C6.39413 9.64585 5.80203 9.46624 5.2984 9.12973C4.79478 8.79321 4.40225 8.31492 4.17046 7.75532C3.93866 7.19572 3.87802 6.57995 3.99618 5.98589C4.11435 5.39182 4.40602 4.84613 4.83432 4.41784C5.26262 3.98954 5.80831 3.69786 6.40237 3.5797C6.99644 3.46153 7.61221 3.52218 8.1718 3.75397C8.7314 3.98576 9.2097 4.37829 9.54621 4.88192C9.88272 5.38554 10.0623 5.97765 10.0623 6.58335C10.0608 7.3951 9.73765 8.17317 9.16365 8.74716C8.58965 9.32116 7.81159 9.64431 6.99984 9.64585Z"
                                      fill=""
                                    ></path>
                                    <path
                                      d="M7 8.77087C8.20812 8.77087 9.1875 7.7915 9.1875 6.58337C9.1875 5.37525 8.20812 4.39587 7 4.39587C5.79188 4.39587 4.8125 5.37525 4.8125 6.58337C4.8125 7.7915 5.79188 8.77087 7 8.77087Z"
                                      fill=""
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>

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
