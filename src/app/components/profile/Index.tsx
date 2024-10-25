import React from "react";
import { Gender, Role } from "../../../types/enums";

const user = JSON.parse(localStorage.getItem("user"));

const Profile: React.FC = () => {
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
                          <td className="py-2 text-gray-600 min-w-32 text-2sm">
                            150x150px JPEG, PNG Image
                          </td>
                          <td className="py-2 text-center">
                            <div className="flex justify-center items-center">
                              <div
                                className="image-input size-16"
                                data-image-input="true"
                              >
                                <input
                                  accept=".png, .jpg, .jpeg"
                                  name="avatar"
                                  type="file"
                                />
                                <input name="avatar_remove" type="hidden" />
                                <div
                                  className="btn btn-icon btn-icon-xs btn-light shadow-default absolute z-1 size-5 -top-0.5 -right-0.5 rounded-full"
                                  data-image-input-remove=""
                                  data-tooltip="#image_input_tooltip"
                                  data-tooltip-trigger="hover"
                                >
                                  <i className="ki-filled ki-cross"></i>
                                </div>
                                <span
                                  className="tooltip"
                                  id="image_input_tooltip"
                                >
                                  Click to remove or revert
                                </span>
                                <div
                                  className="image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300"
                                  style={{
                                    backgroundImage:
                                      "url(/static/metronic-tailwind-html/dist/assets/media/avatars/blank.png)",
                                  }}
                                >
                                  <div
                                    className="image-input-preview rounded-full"
                                    style={{
                                      backgroundImage:
                                        "url(/static/metronic-tailwind-html/dist/assets/media/avatars/300-2.png)",
                                    }}
                                  ></div>
                                  <div className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-dark-clarity absolute">
                                    <svg
                                      className="fill-light opacity-80"
                                      height={12}
                                      viewBox="0 0 14 12"
                                      width={14}
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
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">Name</td>
                          <td className="py-2 text-gray-700 text-sm">
                            {user.first_name} {user.last_name}
                          </td>
                          <td className="py-2 text-center"></td>
                        </tr>
                        <tr>
                          <td className="py-2 min-w-36">Email</td>
                          <td className="py-2 min-w-60">{user.email}</td>
                          <td className="py-2 max-w-16 text-right"></td>
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
                          <td className="py-3 text-center"></td>
                        </tr>
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
