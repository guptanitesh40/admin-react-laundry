import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePermissions } from "../../hooks";
import { useSelector } from "react-redux";

export const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const { hasPermission } = usePermissions();
  const roleId = useSelector((state: any) => state.auth.role_id);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedItem(path);
  }, [location]);

  const getItemClass = (item: string) =>
    selectedItem === item
      ? "bg-blue-100 text-white shadow-md rounded-lg transition-all duration-200"
      : "hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white rounded-lg transition-all duration-200";

  const getSubmenuItemClass = (item: string) =>
    selectedItem === item ? "active" : "";

  return (
    <div
      className="sidebar scrollbar-hide dark:bg-coal-600 bg-light border-r border-r-gray-200 dark:border-r-coal-100 fixed top-0 bottom-0 hidden lg:flex flex-col items-stretch shrink-0"
      data-drawer="true"
      data-drawer-className="drawer drawer-start top-0 bottom-0"
      data-drawer-enable="true|lg:false"
      id="sidebar"
    >
      <div
        className="cursor-pointer sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0"
        id="sidebar_header"
      >
        <Link to="/dashboard">
          <img
            className="default-logo min-h-[22px] max-w-none"
            src="/media/app/Group 34972.png"
          />
        </Link>
      </div>

      <div
        className="sidebar-content flex grow shrink-0 py-5 pr-2"
        id="sidebar_content"
      >
        <div
          className="scrollable-y-hover grow shrink-0 flex pl-2 lg:pl-5 pr-1 lg:pr-3"
          data-scrollable="true"
          data-scrollable-dependencies="#sidebar_header"
          data-scrollable-height="auto"
          data-scrollable-offset="0px"
          data-scrollable-wrappers="#sidebar_content"
          id="sidebar_scrollable"
        >
          <div
            className="menu flex flex-col grow gap-0.5"
            data-menu="true"
            data-menu-accordion-expand-all="false"
            id="sidebar_menu"
          >
            <Link to="/dashboard">
              <div
                className={`menu-item transition-colors duration-200 ${getItemClass(
                  "dashboard"
                )}`}
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                  tabIndex={0}
                >
                  <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.2 1.925H7.7C7.85146 1.925 7.975 2.04854 7.975 2.2V7.7C7.975 7.85146 7.85146 7.975 7.7 7.975H2.2C2.04854 7.975 1.925 7.85146 1.925 7.7V2.2C1.925 2.04854 2.04854 1.925 2.2 1.925ZM0 2.2C0 0.98505 0.98505 0 2.2 0H7.7C8.91495 0 9.9 0.98505 9.9 2.2V7.7C9.9 8.91495 8.91495 9.9 7.7 9.9H2.2C0.98505 9.9 0 8.91495 0 7.7V2.2ZM14.3 1.925H19.8C19.9515 1.925 20.075 2.04854 20.075 2.2V7.7C20.075 7.85146 19.9515 7.975 19.8 7.975H14.3C14.1485 7.975 14.025 7.85146 14.025 7.7V2.2C14.025 2.04854 14.1485 1.925 14.3 1.925ZM12.1 2.2C12.1 0.98505 13.0851 0 14.3 0H19.8C21.0149 0 22 0.98505 22 2.2V7.7C22 8.91495 21.0149 9.9 19.8 9.9H14.3C13.0851 9.9 12.1 8.91495 12.1 7.7V2.2ZM7.7 14.025H2.2C2.04854 14.025 1.925 14.1485 1.925 14.3V19.8C1.925 19.9515 2.04854 20.075 2.2 20.075H7.7C7.85146 20.075 7.975 19.9515 7.975 19.8V14.3C7.975 14.1485 7.85146 14.025 7.7 14.025ZM2.2 12.1C0.98505 12.1 0 13.0851 0 14.3V19.8C0 21.0149 0.98505 22 2.2 22H7.7C8.91495 22 9.9 21.0149 9.9 19.8V14.3C9.9 13.0851 8.91495 12.1 7.7 12.1H2.2ZM14.3 14.025H19.8C19.9515 14.025 20.075 14.1485 20.075 14.3V19.8C20.075 19.9515 19.9515 20.075 19.8 20.075H14.3C14.1485 20.075 14.025 19.9515 14.025 19.8V14.3C14.025 14.1485 14.1485 14.025 14.3 14.025ZM12.1 14.3C12.1 13.0851 13.0851 12.1 14.3 12.1H19.8C21.0149 12.1 22 13.0851 22 14.3V19.8C22 21.0149 21.0149 22 19.8 22H14.3C13.0851 22 12.1 21.0149 12.1 19.8V14.3Z"
                        fill="#cb9ad7"
                      />
                    </svg>
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Dashboard
                  </span>
                </div>
              </div>
            </Link>

            {hasPermission(2, "read") && (
              <Link to="/settings">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "settings"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_3628_2480)">
                          <path
                            d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                            stroke="#cb9ad7"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.1667 12.5C16.0558 12.7513 16.0227 13.0302 16.0717 13.3005C16.1207 13.5708 16.2496 13.8203 16.4417 14.0167L16.4917 14.0667C16.6467 14.2215 16.7696 14.4053 16.8535 14.6076C16.9373 14.8099 16.9805 15.0268 16.9805 15.2458C16.9805 15.4649 16.9373 15.6817 16.8535 15.8841C16.7696 16.0864 16.6467 16.2702 16.4917 16.425C16.3369 16.58 16.1531 16.7029 15.9508 16.7868C15.7484 16.8706 15.5316 16.9138 15.3125 16.9138C15.0935 16.9138 14.8766 16.8706 14.6743 16.7868C14.472 16.7029 14.2882 16.58 14.1334 16.425L14.0834 16.375C13.887 16.1829 13.6375 16.054 13.3672 16.005C13.0969 15.956 12.8181 15.9891 12.5667 16.1C12.3202 16.2056 12.11 16.381 11.962 16.6046C11.8139 16.8282 11.7344 17.0902 11.7334 17.3583V17.5C11.7334 17.942 11.5578 18.366 11.2452 18.6785C10.9327 18.9911 10.5087 19.1667 10.0667 19.1667C9.62468 19.1667 9.20076 18.9911 8.8882 18.6785C8.57564 18.366 8.40004 17.942 8.40004 17.5V17.425C8.39359 17.1492 8.30431 16.8817 8.1438 16.6573C7.98329 16.4328 7.75899 16.2619 7.50004 16.1667C7.24869 16.0557 6.96988 16.0227 6.69955 16.0717C6.42922 16.1207 6.17977 16.2496 5.98337 16.4417L5.93337 16.4917C5.77859 16.6466 5.59477 16.7696 5.39244 16.8534C5.19011 16.9373 4.97323 16.9805 4.75421 16.9805C4.53518 16.9805 4.3183 16.9373 4.11597 16.8534C3.91364 16.7696 3.72983 16.6466 3.57504 16.4917C3.42008 16.3369 3.29715 16.1531 3.21327 15.9507C3.1294 15.7484 3.08623 15.5315 3.08623 15.3125C3.08623 15.0935 3.1294 14.8766 3.21327 14.6743C3.29715 14.4719 3.42008 14.2881 3.57504 14.1333L3.62504 14.0833C3.81715 13.8869 3.94603 13.6375 3.99504 13.3672C4.04406 13.0968 4.01097 12.818 3.90004 12.5667C3.7944 12.3202 3.619 12.11 3.39543 11.9619C3.17185 11.8139 2.90986 11.7344 2.64171 11.7333H2.50004C2.05801 11.7333 1.63409 11.5577 1.32153 11.2452C1.00897 10.9326 0.833374 10.5087 0.833374 10.0667C0.833374 9.62464 1.00897 9.20072 1.32153 8.88816C1.63409 8.5756 2.05801 8.4 2.50004 8.4H2.57504C2.85087 8.39355 3.11838 8.30427 3.34279 8.14376C3.5672 7.98326 3.73814 7.75895 3.83337 7.5C3.9443 7.24866 3.97739 6.96984 3.92838 6.69951C3.87936 6.42918 3.75049 6.17974 3.55837 5.98334L3.50837 5.93334C3.35341 5.77855 3.23048 5.59473 3.14661 5.3924C3.06273 5.19007 3.01956 4.9732 3.01956 4.75417C3.01956 4.53514 3.06273 4.31827 3.14661 4.11594C3.23048 3.91361 3.35341 3.72979 3.50837 3.575C3.66316 3.42004 3.84698 3.29711 4.04931 3.21324C4.25164 3.12936 4.46852 3.08619 4.68754 3.08619C4.90657 3.08619 5.12344 3.12936 5.32577 3.21324C5.5281 3.29711 5.71192 3.42004 5.86671 3.575L5.91671 3.625C6.11311 3.81712 6.36255 3.94599 6.63288 3.99501C6.90321 4.04402 7.18203 4.01093 7.43337 3.9H7.50004C7.74652 3.79437 7.95672 3.61897 8.10478 3.39539C8.25285 3.17182 8.3323 2.90982 8.33337 2.64167V2.5C8.33337 2.05798 8.50897 1.63405 8.82153 1.32149C9.13409 1.00893 9.55801 0.833336 10 0.833336C10.4421 0.833336 10.866 1.00893 11.1786 1.32149C11.4911 1.63405 11.6667 2.05798 11.6667 2.5V2.575C11.6678 2.84316 11.7472 3.10515 11.8953 3.32872C12.0434 3.5523 12.2536 3.7277 12.5 3.83334C12.7514 3.94427 13.0302 3.97736 13.3005 3.92834C13.5709 3.87932 13.8203 3.75045 14.0167 3.55834L14.0667 3.50834C14.2215 3.35338 14.4053 3.23044 14.6076 3.14657C14.81 3.0627 15.0268 3.01952 15.2459 3.01952C15.4649 3.01952 15.6818 3.0627 15.8841 3.14657C16.0864 3.23044 16.2703 3.35338 16.425 3.50834C16.58 3.66312 16.7029 3.84694 16.7868 4.04927C16.8707 4.2516 16.9139 4.46848 16.9139 4.6875C16.9139 4.90653 16.8707 5.12341 16.7868 5.32574C16.7029 5.52807 16.58 5.71188 16.425 5.86667L16.375 5.91667C16.1829 6.11307 16.0541 6.36252 16.005 6.63285C15.956 6.90317 15.9891 7.18199 16.1 7.43334V7.5C16.2057 7.74648 16.3811 7.95668 16.6047 8.10475C16.8282 8.25281 17.0902 8.33227 17.3584 8.33334H17.5C17.9421 8.33334 18.366 8.50893 18.6786 8.82149C18.9911 9.13405 19.1667 9.55798 19.1667 10C19.1667 10.442 18.9911 10.866 18.6786 11.1785C18.366 11.4911 17.9421 11.6667 17.5 11.6667H17.425C17.1569 11.6677 16.8949 11.7472 16.6713 11.8953C16.4477 12.0433 16.2723 12.2535 16.1667 12.5Z"
                            stroke="#cb9ad7"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3628_2480">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Settings
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(3, "read") && (
              <div
                className="menu-item"
                data-menu-item-toggle="accordion"
                data-menu-item-trigger="click"
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[15px] pl-[10px] pr-[10px] py-[6px] ml-1"
                  tabIndex={0}
                >
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.8571 1.42857H17.1429V0.714285C17.1429 0.319634 16.8232 0 16.4286 0C16.0339 0 15.7143 0.319634 15.7143 0.714285V1.42857H13.5714V0.714285C13.5714 0.319634 13.2518 0 12.8571 0C12.4625 0 12.1429 0.319634 12.1429 0.714285V1.42857H10V0.714285C10 0.319634 9.68037 0 9.28571 0C8.89106 0 8.57143 0.319634 8.57143 0.714285V1.42857H7.85714C6.6741 1.42857 5.71429 2.38839 5.71429 3.57143V17.8571C5.71429 19.0402 6.6741 20 7.85714 20H17.8571C19.0402 20 20 19.0402 20 17.8571V3.57143C20 2.38839 19.0402 1.42857 17.8571 1.42857ZM18.5714 17.8571C18.5714 18.0464 18.4964 18.2286 18.3625 18.3625C18.2286 18.4964 18.0464 18.5714 17.8572 18.5714H7.85715C7.4625 18.5714 7.14287 18.2518 7.14287 17.8571V3.57142C7.14287 3.17676 7.4625 2.85713 7.85715 2.85713H8.57144V3.57142C8.57144 3.96607 8.89107 4.2857 9.28572 4.2857C9.68037 4.2857 10 3.96607 10 3.57142V2.85713H12.1429V3.57142C12.1429 3.96607 12.4625 4.2857 12.8572 4.2857C13.2518 4.2857 13.5714 3.96607 13.5714 3.57142V2.85713H15.7143V3.57142C15.7143 3.96607 16.0339 4.2857 16.4286 4.2857C16.8232 4.2857 17.1429 3.96607 17.1429 3.57142V2.85713H17.8572C18.0464 2.85713 18.2286 2.93213 18.3625 3.06606C18.4964 3.19999 18.5714 3.38213 18.5714 3.57141V17.8571ZM17.1429 8.57142C17.1429 8.7607 17.0679 8.94285 16.9339 9.07677C16.8 9.2107 16.6179 9.2857 16.4286 9.2857H9.28572C8.89107 9.2857 8.57144 8.96606 8.57144 8.57141C8.57144 8.17676 8.89107 7.85713 9.28572 7.85713H16.4286C16.6179 7.85713 16.8 7.93213 16.9339 8.06605C17.0679 8.19998 17.1429 8.38214 17.1429 8.57142ZM17.1429 11.4286C17.1429 11.6178 17.0679 11.8 16.9339 11.9339C16.8 12.0678 16.6179 12.1428 16.4286 12.1428H9.28572C8.89107 12.1428 8.57144 11.8232 8.57144 11.4286C8.57144 11.0339 8.89107 10.7143 9.28572 10.7143H16.4286C16.6179 10.7143 16.8 10.7893 16.9339 10.9232C17.0679 11.0571 17.1429 11.2393 17.1429 11.4286ZM14.2857 14.2857C14.2857 14.475 14.2107 14.6571 14.0768 14.791C13.9429 14.925 13.7607 15 13.5714 15H9.28572C8.89107 15 8.57144 14.6803 8.57144 14.2857C8.57144 13.891 8.89107 13.5714 9.28572 13.5714H13.5714C13.7607 13.5714 13.9429 13.6464 14.0768 13.7803C14.2107 13.9143 14.2857 14.0964 14.2857 14.2857ZM2.14286 0C0.959817 0 0 0.959816 0 2.14286V17.1232C0 17.3455 0.0508937 17.5643 0.149106 17.7625L0.863392 19.2044V19.2053C1.10268 19.6928 1.59912 20.0018 2.14287 20C2.68572 20.0027 3.18216 19.6937 3.42145 19.2062L4.13574 17.7652C4.23395 17.5652 4.28573 17.3464 4.28573 17.1232V2.14286C4.28573 0.959818 3.3259 0 2.14286 0ZM2.14286 1.42857C2.33214 1.42857 2.51429 1.50357 2.64821 1.6375C2.78213 1.77143 2.85713 1.95357 2.85713 2.14285V2.85713H1.42856V2.14285C1.42856 1.74819 1.74821 1.42857 2.14286 1.42857ZM2.85714 17.1268L2.14286 18.5715L1.42857 17.1233V4.2858H2.85714V17.1268Z"
                      fill="#cb9ad7"
                    />
                  </svg>

                  <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                    Orders
                  </span>
                  <span className="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                    <i className="ki-filled ki-plus text-2xs menu-item-show:hidden"></i>
                    <i className="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex"></i>
                  </span>
                </div>

                <div className="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[56px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                  <Link to="/orders">
                    <div
                      className={`menu-item ${getSubmenuItemClass("orders")}`}
                    >
                      <div
                        className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                        tabIndex={0}
                      >
                        <span className="menu-bullet flex ml-[36px] w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                        <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                          Orders List
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link to="/pickup-orders">
                    <div
                      className={`menu-item ${getSubmenuItemClass(
                        "pickup-orders"
                      )}`}
                    >
                      <div
                        className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                        tabIndex={0}
                      >
                        <span className="menu-bullet flex ml-[36px] w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                        <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                          Pickup Orders
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link to="/delivered-orders">
                    <div
                      className={`menu-item ${getSubmenuItemClass(
                        "delivered-orders"
                      )}`}
                    >
                      <div
                        className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                        tabIndex={0}
                      >
                        <span className="menu-bullet flex ml-[36px] w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                        <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                          Delivered Orders
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link to="/booking-orders">
                    <div
                      className={`menu-item ${getSubmenuItemClass(
                        "booking-orders"
                      )}`}
                    >
                      <div
                        className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                        tabIndex={0}
                      >
                        <span className="menu-bullet flex ml-[36px] w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                        <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                          Booking Orders
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {hasPermission(4, "read") && (
              <Link to="/payments">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "payments"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 25 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9493 1.01884L23.6006 4.4687C23.8879 4.54717 24.0586 4.84796 23.9815 5.13943L21.9652 12.8003C21.8881 13.0927 21.5926 13.2665 21.3062 13.188L8.65493 9.73815C8.36767 9.65968 8.19698 9.35889 8.27407 9.06743L10.2904 1.40652C10.3675 1.11412 10.663 0.940382 10.9493 1.01884ZM15.8639 8.10629C16.1365 8.18102 16.4127 8.13618 16.6376 8.00447L16.6366 8.00354C16.8633 7.87089 17.0395 7.64949 17.112 7.37299C17.1854 7.09461 17.1414 6.81249 17.0111 6.5827C16.8817 6.35383 16.6651 6.17542 16.3916 6.10162C16.119 6.02688 15.8428 6.07266 15.6179 6.20437C15.3912 6.33702 15.215 6.55842 15.1425 6.83492C15.0691 7.11237 15.1132 7.39353 15.2426 7.62241L15.2435 7.62148C15.3738 7.85221 15.5913 8.03156 15.863 8.10536L15.8639 8.10629ZM17.1744 8.95171C16.71 9.2254 16.1429 9.31788 15.5858 9.16563C15.0269 9.01242 14.5818 8.64437 14.3138 8.1717L14.3147 8.17077L14.3138 8.1689C14.0449 7.69621 13.954 7.11893 14.1036 6.5519C14.2541 5.983 14.6157 5.52995 15.0801 5.25623C15.5454 4.98253 16.1126 4.89005 16.6706 5.04231C17.2286 5.19456 17.6746 5.56356 17.9435 6.03905C18.2124 6.51174 18.3032 7.08903 18.1537 7.65605C18.0031 8.22495 17.6415 8.678 17.1772 8.95172L17.1763 8.94986L17.1744 8.95171ZM13.8034 16.1932L8.68047 16.1623C8.38404 16.1605 8.14452 15.9157 8.14543 15.613C8.14727 15.3113 8.38771 15.0675 8.68508 15.0684L13.3161 15.0955V14.5706L7.48662 12.8405L5.96315 13.6364C5.69975 13.7737 5.37579 13.6672 5.24088 13.3982C5.10597 13.1301 5.21059 12.8003 5.47399 12.663L7.18744 11.769C7.31409 11.7027 7.45451 11.6934 7.58116 11.7307L14.0046 13.6364C14.2395 13.7055 14.3918 13.9241 14.3918 14.1614H14.3937V14.7947L17.8932 13.1693C18.1538 13.0479 18.4594 13.1572 18.5916 13.4122L18.5925 13.4113L19.6167 15.3907C19.7351 15.6186 19.6791 15.8933 19.4965 16.0568L19.4974 16.0577C19.4873 16.0661 16.1147 19.1366 11.9277 19.003H11.9259C11.2275 18.9805 10.5998 18.9507 10.0399 18.9161C9.38925 18.8759 8.79087 18.8283 8.25675 18.7769C7.96123 18.7498 7.74372 18.4845 7.77034 18.1828C7.79695 17.882 8.05761 17.6606 8.35404 17.6877C8.8478 17.7344 9.42872 17.7811 10.1033 17.8222C10.6833 17.8577 11.3046 17.8885 11.9599 17.9091C14.9968 18.0044 17.5793 16.2024 18.4613 15.5035L17.8785 14.377L14.1222 16.121C14.0442 16.1659 13.9533 16.192 13.856 16.192C13.8395 16.192 13.8221 16.1911 13.8056 16.1902L13.8034 16.1932ZM1.75524 14.9461C1.4836 15.0685 1.16513 14.9423 1.04582 14.6658C0.925599 14.3893 1.05041 14.0652 1.32116 13.9437L3.3191 13.0451C3.588 12.9246 3.90188 13.046 4.02485 13.3169L7.03426 19.2338C7.17009 19.5019 7.06638 19.8326 6.80207 19.9717L5.10605 20.9311C4.84632 21.0778 4.51961 20.9825 4.37551 20.7191C4.23143 20.4547 4.32504 20.1221 4.58384 19.9755L5.8384 19.2655L3.29066 14.2576L1.75433 14.9489L1.75524 14.9461ZM19.5128 5.87448C19.5899 5.58208 19.8854 5.40834 20.1718 5.4868C20.4591 5.56527 20.6297 5.86606 20.5527 6.15752C20.5058 6.33688 20.5343 6.51997 20.6187 6.66943C20.7041 6.81983 20.8454 6.9366 21.0207 6.98517C21.308 7.06364 21.4787 7.36443 21.4016 7.65589L20.9656 9.31307C20.9014 9.55874 20.6839 9.71942 20.4453 9.71942V9.72036C20.3893 9.72036 20.3342 9.71195 20.2837 9.69513C20.1149 9.6559 19.9442 9.68579 19.8028 9.76893L19.7799 9.78201C19.6496 9.86515 19.5468 9.99593 19.4991 10.1566C19.4458 10.4023 19.2302 10.5854 18.9732 10.5854C18.6758 10.5854 18.4335 10.3397 18.4335 10.0361H18.4345C18.4345 9.98939 18.44 9.94175 18.4528 9.89504C18.573 9.44012 18.8603 9.07299 19.2292 8.8432L19.2641 8.82078C19.4991 8.68253 19.7652 8.59939 20.0424 8.58444L20.2443 7.81751C20.0121 7.66338 19.823 7.45694 19.6872 7.21779C19.4642 6.82453 19.3871 6.34438 19.511 5.87449L19.5128 5.87448ZM12.7518 8.30057C12.7032 8.55279 12.4848 8.74337 12.2223 8.74337C11.9249 8.74337 11.6826 8.4977 11.6826 8.19408C11.6826 8.1371 11.6909 8.08105 11.7074 8.02967C11.7469 7.85779 11.7166 7.68404 11.6358 7.54017L11.623 7.51682C11.5413 7.38417 11.4128 7.27954 11.2541 7.23097C11.0127 7.17679 10.8328 6.95727 10.8328 6.6957C10.8328 6.63498 10.842 6.578 10.8594 6.52382L11.2871 4.89653C11.3642 4.60413 11.6597 4.43039 11.946 4.50886C12.1222 4.5565 12.3021 4.52754 12.449 4.44066C12.5967 4.35379 12.7114 4.20993 12.7592 4.03151C12.8362 3.73912 13.1318 3.56538 13.4181 3.64384C13.7054 3.72231 13.8761 4.0231 13.799 4.31456C13.6751 4.78538 13.3731 5.16184 12.9877 5.38884C12.7527 5.52709 12.4866 5.61023 12.2094 5.62517L12.0075 6.39303C12.2269 6.5397 12.4086 6.73307 12.5426 6.95727L12.5646 6.99183C12.7821 7.37577 12.861 7.84097 12.75 8.29965L12.7518 8.30057ZM22.803 5.38687L11.1925 2.22015L9.45429 8.82262L21.0648 11.9893L22.803 5.38687Z"
                          fill="#cb9ad7"
                          stroke="#687182"
                          stroke-width="0.3"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Payments
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(5, "read") && (
              <Link to="/category">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "category"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="22"
                        height="24"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3633 20H2.48339C1.11423 20 0 18.8858 0 17.5166V2.48339C0 1.11423 1.11416 0 2.48339 0H13.3633C14.7324 0 15.8467 1.11416 15.8467 2.48339V17.5158C15.8467 18.8849 14.7325 19.9991 13.3633 19.9991V20ZM2.48339 1.33353C1.84922 1.33353 1.3334 1.84937 1.3334 2.48351V17.5159C1.3334 18.1501 1.84924 18.6659 2.48339 18.6659H13.3633C13.9974 18.6659 14.5133 18.15 14.5133 17.5159L14.5141 2.48351C14.5141 1.84935 13.9983 1.33353 13.3641 1.33353H2.48339Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M4.21414 11.8352C3.20248 11.8352 2.37915 11.0119 2.37915 10.0002C2.37915 8.98854 3.20248 8.16521 4.21414 8.16521C5.2258 8.16521 6.04913 8.98854 6.04913 10.0002C6.04913 11.0119 5.2258 11.8352 4.21414 11.8352ZM4.21414 9.49857C3.93747 9.49857 3.71247 9.72357 3.71247 10.0002C3.71247 10.2769 3.93747 10.5019 4.21414 10.5019C4.49081 10.5019 4.71581 10.2769 4.71581 10.0002C4.71581 9.72357 4.49081 9.49857 4.21414 9.49857Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M12.8815 10.6668H7.35819C6.98985 10.6668 6.69153 10.3684 6.69153 10.0001C6.69153 9.63177 6.98985 9.33345 7.35819 9.33345H12.8815C13.2499 9.33345 13.5482 9.63177 13.5482 10.0001C13.5482 10.3684 13.2499 10.6668 12.8815 10.6668Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M4.21414 6.8635C3.20248 6.8635 2.37915 6.04017 2.37915 5.02768C2.37915 4.01603 3.20248 3.1927 4.21414 3.1927C5.2258 3.1927 6.04913 4.01603 6.04913 5.02768C6.04913 6.03934 5.2258 6.8635 4.21414 6.8635ZM4.21414 4.52518C3.93747 4.52518 3.71247 4.75018 3.71247 5.02685C3.71247 5.30352 3.93747 5.52935 4.21414 5.52935C4.49081 5.52935 4.71581 5.30435 4.71581 5.02685C4.71581 4.75018 4.49081 4.52518 4.21414 4.52518Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M12.8815 5.69424H7.35819C6.98985 5.69424 6.69153 5.39591 6.69153 5.02758C6.69153 4.65924 6.98985 4.36092 7.35819 4.36092H12.8815C13.2499 4.36092 13.5482 4.65924 13.5482 5.02758C13.5482 5.39591 13.2499 5.69424 12.8815 5.69424Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M4.21414 16.8084C3.20248 16.8084 2.37915 15.985 2.37915 14.9734C2.37915 13.9617 3.20248 13.1375 4.21414 13.1375C5.2258 13.1375 6.04913 13.9609 6.04913 14.9734C6.04913 15.985 5.2258 16.8084 4.21414 16.8084ZM4.21414 14.47C3.93747 14.47 3.71247 14.695 3.71247 14.9725C3.71247 15.2492 3.93747 15.4742 4.21414 15.4742C4.49081 15.4742 4.71581 15.2492 4.71581 14.9725C4.71581 14.6959 4.49081 14.47 4.21414 14.47Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M12.8815 15.6393H7.35819C6.98985 15.6393 6.69153 15.341 6.69153 14.9726C6.69153 14.6043 6.98985 14.306 7.35819 14.306H12.8815C13.2499 14.306 13.5482 14.6043 13.5482 14.9726C13.5482 15.341 13.2499 15.6393 12.8815 15.6393Z"
                          fill="#cb9ad7"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Category
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(6, "read") && (
              <Link to="/product">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "product"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.1564 1.66484H14.0564V1.76484V6.05596C14.0564 7.1205 13.0974 7.90698 12.0787 7.74497L12.0786 7.74495C11.7582 7.69448 11.456 7.55275 11.2038 7.32547L11.2038 7.32542L10.0671 6.30251L10.0002 6.24229L9.9333 6.30254L8.79747 7.32544L8.79746 7.32546C8.00387 8.04049 6.77984 7.85019 6.21989 6.9871L6.2198 6.98697C6.04178 6.71353 5.94397 6.39374 5.94397 6.05596V1.76484V1.66484H5.84397H2.58423C2.07909 1.66484 1.66506 2.07888 1.66506 2.58401V17.4158C1.66506 17.9209 2.07909 18.335 2.58423 18.335H17.416C17.9212 18.335 18.3352 17.9209 18.3352 17.4158L18.3361 2.58402C18.3361 2.07888 17.922 1.66484 17.4169 1.66484H17.4161H14.1564ZM12.4913 1.76488L12.4914 1.66484L12.3913 1.66484L7.60786 1.66483L7.5078 1.66483L7.50786 1.76489L7.5104 6.08404L7.51044 6.14865L7.56937 6.17517L7.6203 6.19809L7.67967 6.2248L7.72812 6.18133L9.47259 4.61598L9.47341 4.61523C9.76594 4.34675 10.2204 4.33992 10.5222 4.61163L10.5224 4.61174L12.2719 6.18135L12.3204 6.22482L12.3797 6.19811L12.4307 6.17519L12.4896 6.14866L12.4896 6.08403L12.4913 1.76488ZM4.72597 16.2843C4.29399 16.2843 3.94397 15.9344 3.94397 15.5015C3.94397 15.0693 4.29405 14.7186 4.72597 14.7186H7.73448C8.16646 14.7186 8.51648 15.0685 8.51648 15.5015C8.51648 15.9336 8.1664 16.2843 7.73448 16.2843H4.72597ZM2.5841 0.1H17.4159C18.7851 0.1 19.9 1.21481 19.9 2.5841V17.4159C19.9 18.7851 18.7852 19.9 17.4159 19.9H2.5841C1.21489 19.9 0.1 18.7852 0.1 17.4159V2.5841C0.1 1.21489 1.21481 0.1 2.5841 0.1Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.2"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Product
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(7, "read") && (
              <Link to="/services">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "services"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="20"
                        height="23"
                        viewBox="0 0 17 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.875 0H2.125C0.953587 0 0 0.9616 0 2.14286V17.8571C0 19.0384 0.953587 20 2.125 20H14.875C16.0464 20 17 19.0384 17 17.8571V2.14286C17 0.9616 16.0464 0 14.875 0ZM2.125 1.42857H14.875C15.2655 1.42857 15.5833 1.7491 15.5833 2.14286V4.28571H1.41667V2.14286C1.41667 1.7491 1.73452 1.42857 2.125 1.42857ZM14.875 18.5714H2.125C1.73452 18.5714 1.41667 18.2509 1.41667 17.8571V5.71429H15.5833V17.8571C15.5833 18.2509 15.2655 18.5714 14.875 18.5714ZM2.12863 2.85714C2.12863 2.46249 2.44206 2.14286 2.83342 2.14286H2.84051C3.23187 2.14286 3.54884 2.46249 3.54884 2.85714C3.54884 3.25179 3.23187 3.57143 2.84051 3.57143C2.44914 3.57143 2.12863 3.25179 2.12863 2.85714ZM4.25363 2.85714C4.25363 2.46249 4.56706 2.14286 4.95842 2.14286H4.96551C5.35687 2.14286 5.67384 2.46249 5.67384 2.85714C5.67384 3.25179 5.35687 3.57143 4.96551 3.57143C4.57414 3.57143 4.25363 3.25179 4.25363 2.85714ZM6.37863 2.85714C6.37863 2.46249 6.69206 2.14286 7.08342 2.14286H7.09051C7.48187 2.14286 7.79884 2.46249 7.79884 2.85714C7.79884 3.25179 7.48187 3.57143 7.09051 3.57143C6.69914 3.57143 6.37863 3.25179 6.37863 2.85714ZM8.50009 7.14286C5.76604 7.14286 3.54176 9.38571 3.54176 12.1429C3.54176 14.9 5.76592 17.1429 8.50009 17.1429C11.2343 17.1429 13.4584 14.9 13.4584 12.1429C13.4584 9.38571 11.2343 7.14286 8.50009 7.14286ZM8.50009 15.7143C6.54774 15.7143 4.95842 14.1116 4.95842 12.1429C4.95842 10.1741 6.54774 8.57143 8.50009 8.57143C10.4524 8.57143 12.0418 10.1741 12.0418 12.1429C12.0418 14.1116 10.4524 15.7143 8.50009 15.7143ZM10.572 13.1653C10.4055 13.4733 10.0938 13.8974 9.55108 14.1742C9.17921 14.3644 8.81353 14.4287 8.48946 14.4287C7.96529 14.4287 7.54916 14.2608 7.38711 14.184C7.03295 14.0171 6.87976 13.5921 7.04623 13.2349C7.21269 12.8778 7.63325 12.7233 7.98742 12.8912C8.03789 12.9144 8.48855 13.1162 8.9109 12.901C9.1296 12.7894 9.25888 12.6108 9.32883 12.4814C9.51654 12.1349 9.94686 12.0082 10.2895 12.1957C10.633 12.3858 10.7597 12.8197 10.572 13.1653Z"
                          fill="#cb9ad7"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Services
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(8, "read") && (
              <Link to="/customers">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "customers"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.75 15.75V14.25C12.75 13.4544 12.4339 12.6913 11.8713 12.1287C11.3087 11.5661 10.5456 11.25 9.75 11.25H3.75C2.95435 11.25 2.19129 11.5661 1.62868 12.1287C1.06607 12.6913 0.75 13.4544 0.75 14.25V15.75"
                          stroke="#cb9ad7"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.75 8.25C8.40685 8.25 9.75 6.90685 9.75 5.25C9.75 3.59315 8.40685 2.25 6.75 2.25C5.09315 2.25 3.75 3.59315 3.75 5.25C3.75 6.90685 5.09315 8.25 6.75 8.25Z"
                          stroke="#cb9ad7"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.25 15.75V14.25C17.2495 13.5853 17.0283 12.9396 16.621 12.4142C16.2138 11.8889 15.6436 11.5137 15 11.3475"
                          stroke="#cb9ad7"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 2.3475C12.6453 2.51273 13.2173 2.88803 13.6257 3.41424C14.0342 3.94044 14.2559 4.58763 14.2559 5.25375C14.2559 5.91988 14.0342 6.56706 13.6257 7.09327C13.2173 7.61948 12.6453 7.99478 12 8.16"
                          stroke="#cb9ad7"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Customers
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(9, "read") && (
              <Link to="/coupon">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "coupon"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.9977 1.33841e-05C9.5597 -1.10716e-05 9.2751 0.202974 8.97518 0.413616C8.67526 0.624247 8.37863 0.88354 8.08824 1.14546C7.79784 1.40741 7.51676 1.66869 7.27711 1.87501C7.03745 2.08124 6.81067 2.22953 6.78194 2.24151C6.75328 2.25374 6.49166 2.30812 6.17647 2.33226C5.86111 2.35576 5.47557 2.36612 5.08502 2.38627C4.69448 2.4065 4.29821 2.43322 3.93727 2.49656C3.57627 2.55968 3.23825 2.61884 2.92854 2.92855C2.61883 3.23825 2.55861 3.58206 2.49541 3.94302C2.43222 4.30401 2.4041 4.69791 2.38395 5.08847C2.36372 5.47901 2.35352 5.86574 2.32995 6.18107C2.30639 6.49641 2.24765 6.7578 2.23575 6.78654C2.22397 6.81527 2.08017 7.03982 1.87385 7.27942C1.66753 7.51906 1.40047 7.80131 1.13856 8.09169C0.876652 8.38213 0.620718 8.67985 0.410156 8.97979C0.199592 9.27972 2.22333e-06 9.56432 0 10.0023C-4.44643e-06 10.4403 0.198403 10.7215 0.409007 11.0214C0.619571 11.3213 0.880087 11.6225 1.142 11.9129C1.40393 12.2033 1.66523 12.4844 1.87155 12.724C2.07787 12.9637 2.225 13.1859 2.2369 13.2146C2.24868 13.2434 2.3052 13.5094 2.32881 13.8247C2.35238 14.14 2.36267 14.5244 2.38281 14.915C2.40305 15.3055 2.43219 15.6972 2.4954 16.0581C2.55858 16.4191 2.61883 16.7618 2.92853 17.0715C3.23823 17.3812 3.57858 17.4425 3.93956 17.5057C4.30055 17.569 4.69332 17.597 5.08386 17.6172C5.4744 17.6372 5.86227 17.6465 6.17761 17.67C6.49299 17.6937 6.75319 17.7489 6.78193 17.7608C6.81095 17.7737 7.03635 17.9211 7.27596 18.1273C7.51561 18.3336 7.79668 18.5961 8.08708 18.858C8.37748 19.1199 8.67639 19.3804 8.97632 19.591C9.27626 19.8016 9.5597 20 9.99769 20C10.4357 20 10.7214 19.8016 11.0214 19.591C11.3213 19.3804 11.6179 19.1211 11.9083 18.8591C12.1987 18.5972 12.4798 18.3313 12.7194 18.125C12.9591 17.9188 13.1824 17.7761 13.2112 17.7642C13.2398 17.752 13.5049 17.6965 13.8201 17.6723C14.1354 17.6488 14.5198 17.6338 14.9104 17.6138C15.3009 17.5935 15.6983 17.5668 16.0593 17.5035C16.4203 17.4403 16.7571 17.3812 17.0669 17.0715C17.3766 16.7618 17.4391 16.4214 17.5023 16.0604C17.5655 15.6995 17.5924 15.3021 17.6126 14.9115C17.6328 14.521 17.643 14.1389 17.6666 13.8235C17.6902 13.5082 17.7477 13.2422 17.7597 13.2135C17.7714 13.1848 17.9152 12.9602 18.1216 12.7206C18.3279 12.481 18.5961 12.2022 18.858 11.9118C19.1199 11.6213 19.377 11.3248 19.5875 11.0248C19.7981 10.7249 19.9966 10.4403 19.9966 10.0023C19.9966 9.56433 19.7981 9.27856 19.5875 8.97865C19.377 8.6787 19.1176 8.3821 18.8557 8.0917C18.5938 7.80132 18.3313 7.52023 18.125 7.28058C17.9187 7.04094 17.7704 6.81416 17.7585 6.7854C17.7467 6.75659 17.6925 6.49527 17.6689 6.17993C17.6453 5.86459 17.6304 5.48017 17.6103 5.08963C17.5901 4.69907 17.5632 4.30286 17.5 3.94188C17.4368 3.5809 17.3766 3.23943 17.0669 2.9297C16.7572 2.62 16.418 2.56209 16.057 2.49887C15.696 2.43564 15.3032 2.40758 14.9127 2.38742C14.5221 2.36741 14.1331 2.35353 13.8178 2.32997C13.5024 2.30629 13.2434 2.25226 13.2146 2.24035C13.1856 2.22745 12.9602 2.07894 12.7206 1.8727C12.4809 1.66638 12.1987 1.40392 11.9083 1.142C11.6179 0.88009 11.3202 0.619571 11.0202 0.409007C10.7203 0.198443 10.4357 1.33841e-05 9.9977 1.33841e-05ZM9.99992 1.18797C10.0409 1.20776 10.1815 1.25925 10.3434 1.37295C10.5665 1.52953 10.8404 1.76736 11.119 2.01863C11.3975 2.2699 11.6838 2.53476 11.953 2.76656C12.2223 2.99834 12.4503 3.1972 12.7642 3.32722C13.078 3.45717 13.3784 3.47653 13.7327 3.50299C14.0869 3.52938 14.4759 3.54457 14.8506 3.56389C15.2252 3.58323 15.5863 3.60764 15.8547 3.65464C16.0506 3.68899 16.1876 3.75415 16.2304 3.76954C16.244 3.81164 16.3064 3.94815 16.3407 4.14408C16.3877 4.41252 16.419 4.7724 16.4383 5.14706C16.4577 5.52171 16.4693 5.91069 16.4958 6.26494C16.5223 6.61921 16.5404 6.92418 16.6704 7.23805C16.8005 7.55194 17.0016 7.77651 17.2334 8.04573C17.4652 8.31495 17.7312 8.60008 17.9825 8.87868C18.2337 9.15727 18.4704 9.43112 18.627 9.65418C18.7413 9.81697 18.7921 9.96024 18.812 10.0012C18.7915 10.0407 18.7384 10.1846 18.6236 10.3481C18.467 10.5712 18.2326 10.8439 17.9813 11.1225C17.7301 11.4011 17.4652 11.6873 17.2334 11.9566C17.0016 12.2258 16.8027 12.4492 16.6727 12.7631C16.5427 13.077 16.5234 13.3819 16.497 13.7362C16.4705 14.0905 16.4565 14.4794 16.4372 14.8541C16.4179 15.2288 16.3889 15.5909 16.3419 15.8594C16.3076 16.0552 16.2435 16.1913 16.2293 16.2339C16.1859 16.2479 16.0483 16.311 15.8524 16.3454C15.584 16.3924 15.2264 16.4191 14.8517 16.4384C14.4771 16.4578 14.0847 16.4695 13.7304 16.4959C13.3762 16.5225 13.0758 16.545 12.7619 16.6751C12.448 16.805 12.2189 17.0018 11.9496 17.2335C11.6804 17.4654 11.3999 17.7348 11.1213 17.986C10.8427 18.2372 10.5677 18.4694 10.3446 18.626C10.1818 18.7403 10.0394 18.7945 9.99881 18.8155C9.95843 18.7948 9.81579 18.7413 9.65299 18.6271C9.42994 18.4705 9.15723 18.2361 8.87863 17.9848C8.60004 17.7336 8.31261 17.4653 8.04339 17.2335C7.77417 17.0017 7.54729 16.8074 7.23341 16.6774C6.91955 16.5475 6.61686 16.5223 6.2626 16.4959C5.90836 16.4695 5.52168 16.4601 5.14702 16.4407C4.77236 16.4214 4.41017 16.3924 4.14173 16.3454C3.94586 16.311 3.80856 16.2481 3.76604 16.2339C3.75204 16.1907 3.6889 16.0519 3.65459 15.8559C3.60759 15.5875 3.57627 15.2276 3.55692 14.853C3.53758 14.4783 3.52711 14.0894 3.50063 13.7351C3.47415 13.3808 3.45599 13.0793 3.32599 12.7654C3.19598 12.4515 2.99367 12.2235 2.76189 11.9543C2.5301 11.6851 2.26407 11.3999 2.01281 11.1213C1.76155 10.8427 1.52601 10.5689 1.36942 10.3458C1.25524 10.1832 1.20399 10.0421 1.18445 10.0023C1.20401 9.96217 1.25519 9.82032 1.36942 9.65765C1.52599 9.43456 1.76269 9.15614 2.01396 8.87755C2.26521 8.59893 2.53125 8.31726 2.76304 8.04805C2.99481 7.77879 3.19368 7.5508 3.3237 7.23693C3.45369 6.92304 3.47301 6.62266 3.49947 6.26841C3.52592 5.91413 3.54104 5.5252 3.56036 5.15053C3.57971 4.77586 3.60756 4.41367 3.65456 4.14525C3.68887 3.94933 3.75299 3.81206 3.76715 3.76956C3.81012 3.75444 3.94808 3.68901 4.14399 3.65466C4.4124 3.60759 4.76887 3.58096 5.14353 3.56159C5.51818 3.54225 5.91172 3.53056 6.266 3.50414C6.62024 3.47758 6.91947 3.45483 7.23337 3.32493C7.54727 3.19502 7.7764 2.9983 8.04564 2.76656C8.31484 2.5347 8.59656 2.26991 8.87514 2.01863C9.15375 1.76744 9.4276 1.53068 9.65065 1.3741C9.81526 1.25847 9.96097 1.20727 9.99992 1.18797ZM7.33563 5.2252C6.79684 5.2372 6.26263 5.44688 5.85471 5.85479C5.01254 6.69696 5.01254 8.08363 5.85471 8.92579C6.69687 9.76796 8.07895 9.76451 8.92111 8.92224C9.76328 8.08007 9.76328 6.70029 8.92111 5.85813C8.48687 5.42389 7.90919 5.21242 7.33563 5.2252ZM13.0675 6.34537C12.99 6.34538 12.9132 6.36071 12.8416 6.39049C12.7701 6.42026 12.7051 6.46388 12.6504 6.51885L6.51532 12.6505C6.46037 12.7052 6.41676 12.7702 6.387 12.8417C6.35724 12.9133 6.34192 12.99 6.34192 13.0676C6.34192 13.1451 6.35724 13.2218 6.387 13.2934C6.41676 13.365 6.46037 13.4299 6.51532 13.4846C6.62554 13.5942 6.77465 13.6557 6.93007 13.6557C7.0855 13.6557 7.23461 13.5942 7.34482 13.4846L13.4799 7.34835C13.5895 7.23813 13.651 7.08903 13.651 6.9336C13.651 6.77818 13.5895 6.62907 13.4799 6.51885C13.3707 6.40895 13.2224 6.34661 13.0675 6.34537ZM7.38848 6.39361C7.64114 6.39438 7.89302 6.49375 8.08931 6.69003C8.48189 7.08261 8.48189 7.69796 8.08931 8.09054C7.69673 8.48311 7.07909 8.48541 6.68651 8.09276C6.29393 7.70018 6.29393 7.07908 6.68651 6.68651C6.8828 6.49022 7.13583 6.39285 7.38848 6.39361ZM12.6091 10.4458C12.0535 10.4458 11.4987 10.6566 11.0776 11.0777C10.2354 11.9198 10.232 13.3031 11.074 14.1452C11.9162 14.9874 13.3017 14.9874 14.1439 14.1452C14.986 13.3031 14.9838 11.9198 14.1417 11.0777C13.7206 10.6566 13.1646 10.4458 12.6091 10.4458ZM12.6079 11.6142C12.8606 11.615 13.1125 11.7132 13.3087 11.9095C13.7013 12.302 13.7048 12.9208 13.3121 13.3134C12.9195 13.706 12.2984 13.706 11.9058 13.3134C11.5133 12.9208 11.5133 12.2997 11.9058 11.9072C12.1021 11.7109 12.3553 11.6134 12.6079 11.6142Z"
                          fill="#cb9ad7"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Coupon
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(10, "read") && (
              <Link to="/price">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "price"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 1C5.48661 1 1 5.48661 1 11C1 16.5134 5.48661 21 11 21C16.5134 21 21 16.5134 21 11C21 5.48661 16.5134 1 11 1ZM11 19.8839C6.08929 19.8839 2.11607 15.9107 2.11607 11C2.11607 6.08929 6.08929 2.11607 11 2.11607C15.9107 2.11607 19.8839 6.08929 19.8839 11C19.8839 15.9107 15.9107 19.8839 11 19.8839Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M14.7946 6.71429C14.7946 6.37947 14.5268 6.11161 14.1919 6.11161H10.241H8.09818H7.83032C7.4955 6.11161 7.22764 6.37947 7.22764 6.71429C7.22764 7.04911 7.4955 7.31697 7.83032 7.31697H8.09818H8.41068H10.241C10.866 7.31697 11.4018 7.69643 11.6473 8.23215H8.85711H7.808C7.47318 8.23215 7.20532 8.5 7.20532 8.83482C7.20532 9.16965 7.47318 9.4375 7.808 9.4375H9.45979H11.625C11.3794 9.97322 10.8437 10.3527 10.2187 10.3527H9.90621H8.09818C7.85264 10.3527 7.62943 10.5089 7.54014 10.7321C7.45086 10.9554 7.4955 11.2232 7.67407 11.4018L11.9598 15.6875C12.0714 15.7991 12.2276 15.8661 12.3839 15.8661C12.5401 15.8661 12.6964 15.7991 12.808 15.6875C13.0535 15.442 13.0535 15.0625 12.808 14.817L11.5134 13.5223L9.57139 11.5804H10.241C10.3526 11.5804 10.4419 11.5804 10.5312 11.558C11.7143 11.4241 12.6518 10.5536 12.9196 9.4375H14.1919C14.5268 9.4375 14.7946 9.16965 14.7946 8.83482C14.7946 8.5 14.5268 8.23215 14.1919 8.23215H12.9196C12.8526 7.89732 12.7187 7.58482 12.5178 7.31697H14.1696C14.5267 7.33929 14.7946 7.04911 14.7946 6.71429Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Price
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(11, "read") && (
              <Link to="/price-content">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "price-content"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_3630_2612)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.9401 10.3708C6.81043 10.3482 6.69283 10.2802 6.60806 10.1787C6.5233 10.0773 6.47681 9.94889 6.47681 9.81624C6.47681 9.68359 6.5233 9.5552 6.60806 9.45374C6.69283 9.35227 6.81043 9.28426 6.9401 9.26169H13.0534C13.1831 9.28426 13.3007 9.35227 13.3854 9.45374C13.4702 9.5552 13.5167 9.68359 13.5167 9.81624C13.5167 9.94889 13.4702 10.0773 13.3854 10.1787C13.3007 10.2802 13.1831 10.3482 13.0534 10.3708H6.9401ZM12.5846 18.5201C12.731 18.5201 12.8713 18.5787 12.9748 18.683C13.0783 18.7873 13.1364 18.9288 13.1364 19.0763C13.1364 19.2238 13.0783 19.3653 12.9748 19.4696C12.8713 19.5739 12.731 19.6325 12.5846 19.6325H1.28418C0.943594 19.6325 0.616958 19.4961 0.376127 19.2533C0.135297 19.0106 0 18.6813 0 18.338L0 1.2945C0 0.95118 0.135297 0.621918 0.376127 0.379151C0.616958 0.136385 0.943594 0 1.28418 0L17.054 0C17.3946 0 17.7213 0.136385 17.9621 0.379151C18.2029 0.621918 18.3382 0.95118 18.3382 1.2945V7.4356C18.3382 7.58311 18.2801 7.72458 18.1766 7.82889C18.0731 7.9332 17.9328 7.9918 17.7865 7.9918C17.6401 7.9918 17.4998 7.9332 17.3963 7.82889C17.2928 7.72458 17.2347 7.58311 17.2347 7.4356V1.2945C17.2343 1.24637 17.215 1.20036 17.181 1.16653C17.1472 1.13257 17.1017 1.11316 17.054 1.11239H1.28418C1.23636 1.11328 1.19056 1.13199 1.1556 1.16489C1.12322 1.2003 1.10471 1.24636 1.10352 1.2945V18.3363C1.10352 18.3846 1.12255 18.431 1.15643 18.4651C1.19031 18.4993 1.23626 18.5185 1.28418 18.5185H12.5846V18.5201ZM6.9401 14.4512C6.81044 14.4256 6.69361 14.3555 6.60963 14.2526C6.52564 14.1498 6.47972 14.0208 6.47972 13.8876C6.47972 13.7544 6.52564 13.6254 6.60963 13.5226C6.69361 13.4198 6.81044 13.3496 6.9401 13.324H11.7464C11.8775 13.3478 11.9962 13.4172 12.0817 13.5203C12.1672 13.6233 12.214 13.7533 12.214 13.8876C12.214 14.0219 12.1672 14.1519 12.0817 14.255C11.9962 14.358 11.8775 14.4274 11.7464 14.4512H6.9401ZM6.9401 6.30025C6.80572 6.28733 6.68181 6.22152 6.59527 6.11708C6.50873 6.01264 6.46654 5.87801 6.47786 5.74241C6.46701 5.60726 6.50945 5.47324 6.59598 5.36943C6.68252 5.26561 6.80616 5.20037 6.9401 5.18786H13.0534C13.186 5.20238 13.3077 5.26842 13.3928 5.37195C13.4779 5.47549 13.5196 5.60838 13.5091 5.74241C13.521 5.87707 13.4798 6.01103 13.3946 6.11539C13.3093 6.21974 13.1868 6.28614 13.0534 6.30025H6.9401ZM4.28874 13.1255C4.4175 13.1255 4.54337 13.164 4.65044 13.2361C4.7575 13.3082 4.84094 13.4107 4.89022 13.5306C4.9395 13.6506 4.95239 13.7825 4.92727 13.9098C4.90215 14.0371 4.84014 14.1541 4.74909 14.2458C4.65804 14.3376 4.54204 14.4001 4.41575 14.4255C4.28946 14.4508 4.15856 14.4378 4.03959 14.3881C3.92063 14.3384 3.81895 14.2543 3.74742 14.1464C3.67588 14.0385 3.6377 13.9116 3.6377 13.7818C3.6377 13.6077 3.70629 13.4408 3.82838 13.3177C3.95047 13.1947 4.11607 13.1255 4.28874 13.1255ZM4.28874 9.10746C4.4175 9.10746 4.54337 9.14596 4.65044 9.21807C4.7575 9.29018 4.84094 9.39268 4.89022 9.5126C4.9395 9.63251 4.95239 9.76447 4.92727 9.89177C4.90215 10.0191 4.84014 10.136 4.74909 10.2278C4.65804 10.3196 4.54204 10.3821 4.41575 10.4074C4.28946 10.4327 4.15856 10.4197 4.03959 10.3701C3.92063 10.3204 3.81895 10.2363 3.74742 10.1283C3.67588 10.0204 3.6377 9.89354 3.6377 9.76374C3.6377 9.58969 3.70629 9.42276 3.82838 9.29968C3.95047 9.17661 4.11607 9.10746 4.28874 9.10746ZM4.28874 5.09106C4.4175 5.09106 4.54337 5.12955 4.65044 5.20166C4.7575 5.27377 4.84094 5.37627 4.89022 5.49619C4.9395 5.61611 4.95239 5.74806 4.92727 5.87537C4.90215 6.00267 4.84014 6.11961 4.74909 6.21139C4.65804 6.30317 4.54204 6.36568 4.41575 6.391C4.28946 6.41632 4.15856 6.40333 4.03959 6.35365C3.92063 6.30398 3.81895 6.21986 3.74742 6.11194C3.67588 6.00402 3.6377 5.87713 3.6377 5.74733C3.6377 5.57328 3.70629 5.40635 3.82838 5.28328C3.95047 5.1602 4.11607 5.09106 4.28874 5.09106Z"
                            fill="#cb9ad7"
                          />
                          <path
                            d="M19 11.4325C19 11.1922 18.8235 11 18.6029 11H16H14.5882H14.4118C14.1912 11 14.0147 11.1922 14.0147 11.4325C14.0147 11.6728 14.1912 11.865 14.4118 11.865H14.5882H14.7941H16C16.4118 11.865 16.7647 12.1373 16.9265 12.5217H15.0882H14.3971C14.1765 12.5217 14 12.714 14 12.9542C14 13.1945 14.1765 13.3867 14.3971 13.3867H15.4853H16.9118C16.75 13.7712 16.3971 14.0435 15.9853 14.0435H15.7794H14.5882C14.4265 14.0435 14.2794 14.1556 14.2206 14.3158C14.1618 14.476 14.1912 14.6682 14.3088 14.7963L17.1324 17.8719C17.2059 17.9519 17.3088 18 17.4118 18C17.5147 18 17.6176 17.9519 17.6912 17.8719C17.8529 17.6957 17.8529 17.4233 17.6912 17.2471L16.8382 16.3181L15.5588 14.9245H16C16.0735 14.9245 16.1324 14.9245 16.1912 14.9085C16.9706 14.8124 17.5882 14.1876 17.7647 13.3867H18.6029C18.8235 13.3867 19 13.1945 19 12.9542C19 12.714 18.8235 12.5217 18.6029 12.5217H17.7647C17.7206 12.2815 17.6324 12.0572 17.5 11.865H18.5882C18.8235 11.881 19 11.6728 19 11.4325Z"
                            fill="#cb9ad7"
                            stroke="#cb9ad7"
                            stroke-width="0.3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3630_2612">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Price Content
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(12, "read") && (
              <Link to="/companies">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "companies"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.60056 8.14045H7.38315C7.02316 8.14045 6.72864 8.44043 6.72864 8.80709C6.72864 9.17375 7.02316 9.47373 7.38315 9.47373H8.60056C8.96055 9.47373 9.25507 9.17375 9.25507 8.80709C9.25507 8.44043 8.96055 8.14045 8.60056 8.14045Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M11.0351 9.47373H12.2525C12.6125 9.47373 12.9071 9.17375 12.9071 8.80709C12.9071 8.44043 12.6125 8.14045 12.2525 8.14045H11.0351C10.6751 8.14045 10.3806 8.44043 10.3806 8.80709C10.3806 9.17375 10.6751 9.47373 11.0351 9.47373Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M8.60056 11.2403H7.38315C7.02316 11.2403 6.72864 11.5402 6.72864 11.9069C6.72864 12.2736 7.02316 12.5735 7.38315 12.5735H8.60056C8.96055 12.5735 9.25507 12.2736 9.25507 11.9069C9.25507 11.5402 8.96055 11.2403 8.60056 11.2403Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M12.2461 11.2403H11.0287C10.6687 11.2403 10.3741 11.5402 10.3741 11.9069C10.3741 12.2736 10.6687 12.5735 11.0287 12.5735H12.2461C12.6061 12.5735 12.9006 12.2736 12.9006 11.9069C12.9006 11.5402 12.6061 11.2403 12.2461 11.2403Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M18.9811 18.6667H18.3266V3.80742C18.3266 3.56743 18.2022 3.34745 17.9928 3.22743L12.5734 0.0875141C12.3705 -0.0324807 12.1218 -0.0258144 11.9189 0.0875141C11.716 0.207509 11.5916 0.42751 11.5916 0.660823V5.04058H8.03753V0.667436C8.03753 0.427446 7.91318 0.207466 7.71028 0.0941272C7.50738 -0.0258677 7.25867 -0.0258677 7.05576 0.0941272L1.64285 3.22743C1.43995 3.34743 1.30903 3.56743 1.30903 3.80742V18.6667H0.654517C0.294522 18.6667 0 18.9667 0 19.3334C0 19.7 0.294522 20 0.654517 20H18.981C19.341 20 19.6355 19.7 19.6355 19.3334C19.6355 18.9667 19.3411 18.6667 18.9811 18.6667ZM12.9007 1.81412L17.0176 4.20079V18.6667H15.9442V5.7139C15.9442 5.34723 15.6496 5.04726 15.2896 5.04726H12.9072V1.81412H12.9007ZM10.4724 15.667H11.5916V18.6667H10.4724V15.667ZM9.16337 18.6667H8.04413V15.667H9.16337V18.6667ZM12.2462 14.3337H7.38308C7.02309 14.3337 6.72856 14.6337 6.72856 15.0003V18.6669H5.00064V6.38075H14.6286V18.6669H12.9007V15.0003C12.9007 14.6337 12.6062 14.3337 12.2462 14.3337ZM2.61819 4.20079L6.73506 1.81412V5.04726H4.35261C3.99262 5.04726 3.6981 5.34723 3.6981 5.7139V18.6667H2.62469V4.20079H2.61819Z"
                          fill="#cb9ad7"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Company
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(13, "read") && (
              <Link to="/branches">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "branches"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6 15.6154V10.2308H11.4V6.38461H13.8V1H8.19999V6.38461H10.6V10.2308H3.4V15.6154H1V21H6.59999V15.6154H4.20001V11H10.6V15.6154H8.19999V21H13.8V15.6154H11.4V11H17.8V15.6154H15.4V21H21V15.6154H18.6ZM5.8 16.3846V20.2308H1.8V16.3846H5.8ZM13 16.3846V20.2308H9V16.3846H13ZM9 5.61537V1.76923H13V5.61537H9ZM20.2 20.2308H16.2V16.3846H20.2V20.2308Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.5"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Branch
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(14, "read") && (
              <Link to="/banner">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "banner"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="30" height="30" />
                        <path
                          d="M22.9643 6H8.03571C6.91183 6 6 6.93028 6 8.07692V21.9231C6 23.0697 6.91183 24 8.03571 24H22.9643C24.0882 24 25 23.0697 25 21.9231V8.07692C25 6.93028 24.0882 6 22.9643 6ZM8.03571 7.38462H22.9643C23.1441 7.38462 23.3171 7.45731 23.4444 7.58711C23.5716 7.71692 23.6428 7.89346 23.6428 8.07691V15.5988L21.1253 13.4578C20.6172 13.0243 19.875 13.0295 19.3729 13.4708L15.5347 16.8267L13.0664 14.3076C12.5363 13.7667 11.6779 13.7667 11.1478 14.3076L7.35709 18.175V8.0768C7.35709 7.69429 7.6608 7.38462 8.03571 7.38462ZM22.9643 22.6154H8.03571C7.6608 22.6154 7.35714 22.3056 7.35714 21.9231V20.1326L12.1071 15.2864L17.0556 20.3351V20.336C17.322 20.5982 17.7452 20.5938 18.0073 20.3273C18.2685 20.0599 18.2728 19.6281 18.0158 19.3563L16.4975 17.8082L20.256 14.5214L23.643 17.4014V21.923C23.643 22.1065 23.5718 22.283 23.4445 22.4128C23.3173 22.5426 23.1441 22.6154 22.9643 22.6154ZM10.75 10.8462C10.75 10.2863 11.0808 9.78086 11.588 9.56712C12.0953 9.35251 12.6788 9.47107 13.0665 9.86742C13.455 10.2629 13.5712 10.8583 13.3608 11.3758C13.1513 11.8933 12.6559 12.2308 12.1072 12.2308C11.3573 12.2308 10.75 11.6111 10.75 10.8462Z"
                          fill="#cb9ad7"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Banner
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {roleId === 1 && (
              <div
                className="menu-item"
                data-menu-item-toggle="accordion"
                data-menu-item-trigger="click"
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[15px] pl-[10px] pr-[10px] py-[6px] ml-1"
                  tabIndex={0}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
                      stroke="#cb9ad7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                      stroke="#cb9ad7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                    Users and Roles
                  </span>
                  <span className="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                    <i className="ki-filled ki-plus text-2xs menu-item-show:hidden"></i>
                    <i className="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex"></i>
                  </span>
                </div>

                <div className="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[56px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                  <Link to="/users">
                    <div
                      className={`menu-item ${getSubmenuItemClass("users")}`}
                    >
                      <div
                        className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                        tabIndex={0}
                      >
                        <span className="menu-bullet flex ml-[36px] w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                        <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                          Users
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link to="/roles">
                    <div
                      className={`menu-item ${getSubmenuItemClass("roles")}`}
                    >
                      <div
                        className="menu-link border border-transparent items-center grow menu-item-active:bg-secondary-active dark:menu-item-active:bg-coal-300 dark:menu-item-active:border-gray-100 menu-item-active:rounded-lg hover:bg-secondary-active dark:hover:bg-coal-300 dark:hover:border-gray-100 hover:rounded-lg gap-[14px] pl-[10px] pr-[10px] py-[8px]"
                        tabIndex={0}
                      >
                        <span className="menu-bullet flex ml-[36px] w-[6px] relative before:absolute before:top-0 before:size-[6px] before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 menu-item-active:before:bg-primary menu-item-hover:before:bg-primary"></span>
                        <span className="menu-title text-2sm font-medium text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-link-hover:!text-primary">
                          Roles and Permissions
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {hasPermission(15, "read") && (
              <Link to="/workshops">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "workshops"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="22"
                        height="24"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.3596 7.4275L13.4327 3.75997C13.1746 3.27173 12.7407 2.89979 12.2187 2.71944V1.7303C13.1299 1.6402 14.035 1.4965 14.9292 1.29996C15.0136 1.2814 15.0935 1.24641 15.1643 1.19699C15.2351 1.14757 15.2955 1.08468 15.342 1.01192C15.3885 0.939152 15.4203 0.857937 15.4354 0.772908C15.4505 0.687879 15.4488 0.600702 15.4302 0.516354C15.4117 0.432006 15.3767 0.352139 15.3273 0.281313C15.2778 0.210486 15.215 0.150089 15.1422 0.103567C15.0694 0.0570453 14.9882 0.0253113 14.9032 0.0101767C14.8181 -0.00495784 14.731 -0.00319657 14.6466 0.01536C12.3665 0.464843 10.0465 0.680061 7.72263 0.65766C5.40244 0.694838 3.08453 0.494684 0.805062 0.0603209C0.634714 0.0228443 0.456455 0.0545733 0.3095 0.148528C0.162546 0.242482 0.0589334 0.390966 0.0214567 0.561315C-0.01602 0.731663 0.0157089 0.909922 0.109663 1.05688C0.203618 1.20383 0.352102 1.30744 0.52245 1.34492C1.4155 1.52614 2.31841 1.65482 3.22653 1.7303V2.71944C2.70457 2.89979 2.27064 3.27173 2.01259 3.75997L0.0856866 7.4275C0.0370535 7.51196 0.0082772 7.60638 0.00153768 7.7036C-0.00520184 7.80083 0.0102722 7.89831 0.0467873 7.98867C0.0833024 8.07903 0.139901 8.15989 0.212297 8.22514C0.284693 8.29039 0.370987 8.3383 0.464643 8.36526L2.39154 8.96902V15.8609C2.40168 16.4339 2.63731 16.9798 3.04733 17.3802C3.45735 17.7806 4.0087 18.0032 4.58179 17.9998H10.8635C11.4399 18.0083 11.9962 17.788 12.4104 17.3871C12.8246 16.9861 13.0629 16.4373 13.073 15.8609V8.94333L14.9999 8.33314C15.0894 8.30458 15.1715 8.25673 15.2405 8.19297C15.3095 8.12921 15.3637 8.0511 15.3992 7.96413C15.4347 7.87716 15.4507 7.78346 15.4461 7.68963C15.4415 7.5958 15.4163 7.50413 15.3724 7.42108L15.3596 7.4275ZM7.72263 1.94226C8.84023 1.94226 9.9193 1.90372 10.9341 1.83949V2.58456H10.0799C9.90952 2.58456 9.74615 2.65223 9.6257 2.77268C9.50524 2.89314 9.43757 3.05651 9.43757 3.22686C9.41086 3.66271 9.21889 4.07196 8.90082 4.37114C8.58274 4.67032 8.16251 4.8369 7.72584 4.8369C7.28917 4.8369 6.86895 4.67032 6.55087 4.37114C6.2328 4.07196 6.04083 3.66271 6.01411 3.22686C6.01411 3.05651 5.94644 2.89314 5.82599 2.77268C5.70553 2.65223 5.54216 2.58456 5.37181 2.58456H4.51113V1.83949C5.52597 1.90372 6.60503 1.94226 7.72263 1.94226ZM12.2187 7.85784C12.0834 7.90024 11.9659 7.98624 11.8846 8.10243C11.8032 8.21862 11.7626 8.35846 11.7691 8.50014V15.8866C11.7527 16.1143 11.6497 16.3271 11.4813 16.4812C11.3128 16.6353 11.0918 16.719 10.8635 16.7152H4.58179C4.34603 16.7239 4.11642 16.6389 3.94311 16.4788C3.7698 16.3188 3.6669 16.0966 3.65687 15.8609V8.47445C3.66336 8.33277 3.62277 8.19293 3.54144 8.07674C3.46011 7.96055 3.34261 7.87455 3.20726 7.83215L1.58225 7.31831L3.14946 4.35088C3.17245 4.31469 3.19822 4.28033 3.22653 4.24812V4.51146C3.22653 4.68181 3.2942 4.84518 3.41466 4.96563C3.53511 5.08609 3.69848 5.15376 3.86883 5.15376C4.03918 5.15376 4.20255 5.08609 4.32301 4.96563C4.44346 4.84518 4.51113 4.68181 4.51113 4.51146V3.86916H4.80017C4.97233 4.51269 5.35208 5.08141 5.88051 5.48705C6.40893 5.8927 7.05647 6.11258 7.72263 6.11258C8.3888 6.11258 9.03634 5.8927 9.56476 5.48705C10.0932 5.08141 10.4729 4.51269 10.6451 3.86916H10.9341V4.51146C10.9341 4.68181 11.0018 4.84518 11.1223 4.96563C11.2427 5.08609 11.4061 5.15376 11.5764 5.15376C11.7468 5.15376 11.9102 5.08609 12.0306 4.96563C12.1511 4.84518 12.2187 4.68181 12.2187 4.51146V4.24812C12.2473 4.2824 12.2731 4.31891 12.2958 4.35731L13.863 7.344L12.2187 7.85784ZM10.9341 8.36526C10.9341 8.53561 10.8665 8.69898 10.746 8.81943C10.6256 8.93989 10.4622 9.00756 10.2918 9.00756H9.00723C8.83688 9.00756 8.67351 8.93989 8.55306 8.81943C8.4326 8.69898 8.36493 8.53561 8.36493 8.36526C8.36493 8.19491 8.4326 8.03154 8.55306 7.91108C8.67351 7.79063 8.83688 7.72296 9.00723 7.72296H10.2918C10.4622 7.72296 10.6256 7.79063 10.746 7.91108C10.8665 8.03154 10.9341 8.19491 10.9341 8.36526Z"
                          fill="#cb9ad7"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Workshops
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(16, "read") && (
              <Link to="/workshop-order">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "workshop-order"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="24"
                        height="22"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.67675 9.45195C6.57069 9.43355 6.47449 9.37812 6.40516 9.29543C6.33582 9.21274 6.2978 9.10811 6.2978 9C6.2978 8.89189 6.33582 8.78726 6.40516 8.70457C6.47449 8.62188 6.57069 8.56644 6.67675 8.54805H11.6772C11.7833 8.56644 11.8795 8.62188 11.9488 8.70457C12.0181 8.78726 12.0562 8.89189 12.0562 9C12.0562 9.10811 12.0181 9.21274 11.9488 9.29543C11.8795 9.37812 11.7833 9.43355 11.6772 9.45195H6.67675ZM11.2938 16.0934C11.4135 16.0934 11.5283 16.1412 11.6129 16.2262C11.6975 16.3112 11.7451 16.4265 11.7451 16.5467C11.7451 16.6669 11.6975 16.7822 11.6129 16.8672C11.5283 16.9522 11.4135 17 11.2938 17H2.05041C1.77183 17 1.50465 16.8888 1.30766 16.691C1.11067 16.4932 1 16.2248 1 15.945V2.05499C1 1.77519 1.11067 1.50685 1.30766 1.309C1.50465 1.11115 1.77183 1 2.05041 1H14.9496C15.2282 1 15.4954 1.11115 15.6923 1.309C15.8893 1.50685 16 1.77519 16 2.05499V7.05984C16 7.18005 15.9525 7.29535 15.8678 7.38036C15.7832 7.46536 15.6684 7.51312 15.5487 7.51312C15.429 7.51312 15.3142 7.46536 15.2296 7.38036C15.1449 7.29535 15.0974 7.18005 15.0974 7.05984V2.05499C15.097 2.01576 15.0812 1.97826 15.0534 1.95069C15.0258 1.92302 14.9886 1.9072 14.9496 1.90657H2.05041C2.0113 1.9073 1.97383 1.92254 1.94524 1.94936C1.91875 1.97821 1.90361 2.01575 1.90264 2.05499V15.9437C1.90264 15.983 1.91821 16.0208 1.94592 16.0486C1.97363 16.0765 2.01122 16.0921 2.05041 16.0921H11.2938V16.0934ZM6.67675 12.7774C6.57069 12.7565 6.47513 12.6993 6.40644 12.6156C6.33774 12.5318 6.30018 12.4266 6.30018 12.3181C6.30018 12.2095 6.33774 12.1044 6.40644 12.0206C6.47513 11.9368 6.57069 11.8796 6.67675 11.8588H10.6081C10.7154 11.8781 10.8125 11.9347 10.8824 12.0187C10.9523 12.1026 10.9906 12.2086 10.9906 12.3181C10.9906 12.4275 10.9523 12.5335 10.8824 12.6174C10.8125 12.7014 10.7154 12.758 10.6081 12.7774H6.67675ZM6.67675 6.13455C6.56683 6.12402 6.46548 6.07038 6.39469 5.98527C6.32391 5.90016 6.2894 5.79044 6.29866 5.67993C6.28978 5.56978 6.3245 5.46056 6.39528 5.37595C6.46606 5.29135 6.5672 5.23818 6.67675 5.22798H11.6772C11.7857 5.23981 11.8853 5.29363 11.9549 5.37801C12.0245 5.46239 12.0586 5.57069 12.05 5.67993C12.0597 5.78967 12.026 5.89884 11.9563 5.98389C11.8865 6.06894 11.7863 6.12305 11.6772 6.13455H6.67675ZM4.50803 11.697C4.61336 11.697 4.71632 11.7283 4.80389 11.7871C4.89146 11.8459 4.95972 11.9294 5.00002 12.0271C5.04033 12.1249 5.05088 12.2324 5.03033 12.3362C5.00978 12.4399 4.95906 12.5352 4.88459 12.61C4.81011 12.6848 4.71522 12.7358 4.61192 12.7564C4.50862 12.777 4.40155 12.7664 4.30424 12.726C4.20694 12.6855 4.12377 12.6169 4.06525 12.529C4.00674 12.441 3.9755 12.3376 3.9755 12.2318C3.9755 12.09 4.03161 11.9539 4.13148 11.8536C4.23135 11.7533 4.3668 11.697 4.50803 11.697ZM4.50803 8.42236C4.61336 8.42236 4.71632 8.45373 4.80389 8.5125C4.89146 8.57127 4.95972 8.6548 5.00002 8.75253C5.04033 8.85027 5.05088 8.9578 5.03033 9.06155C5.00978 9.16531 4.95906 9.26061 4.88459 9.33541C4.81011 9.41021 4.71522 9.46115 4.61192 9.48178C4.50862 9.50242 4.40155 9.49183 4.30424 9.45135C4.20694 9.41087 4.12377 9.34231 4.06525 9.25436C4.00674 9.1664 3.9755 9.06299 3.9755 8.95721C3.9755 8.81536 4.03161 8.67932 4.13148 8.57902C4.23135 8.47871 4.3668 8.42236 4.50803 8.42236ZM4.50803 5.14909C4.61336 5.14909 4.71632 5.18046 4.80389 5.23923C4.89146 5.298 4.95972 5.38153 5.00002 5.47926C5.04033 5.57699 5.05088 5.68453 5.03033 5.78828C5.00978 5.89203 4.95906 5.98733 4.88459 6.06213C4.81011 6.13693 4.71522 6.18787 4.61192 6.20851C4.50862 6.22915 4.40155 6.21855 4.30424 6.17807C4.20694 6.13759 4.12377 6.06904 4.06525 5.98108C4.00674 5.89313 3.9755 5.78972 3.9755 5.68394C3.9755 5.54209 4.03161 5.40605 4.13148 5.30574C4.23135 5.20544 4.3668 5.14909 4.50803 5.14909Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.1"
                        />
                        <path
                          d="M19.8265 12.3011L18.9701 10.6711C18.8554 10.4541 18.6625 10.2888 18.4305 10.2086V9.76902C18.8355 9.72898 19.2378 9.66511 19.6352 9.57776C19.6727 9.56951 19.7082 9.55396 19.7397 9.532C19.7712 9.51003 19.798 9.48208 19.8187 9.44974C19.8394 9.4174 19.8535 9.38131 19.8602 9.34351C19.8669 9.30572 19.8661 9.26698 19.8579 9.22949C19.8496 9.192 19.8341 9.15651 19.8121 9.12503C19.7902 9.09355 19.7622 9.06671 19.7299 9.04603C19.6975 9.02535 19.6614 9.01125 19.6236 9.00452C19.5858 8.9978 19.5471 8.99858 19.5096 9.00683C18.4962 9.2066 17.4651 9.30225 16.4323 9.29229C15.4011 9.30882 14.3709 9.21986 13.3578 9.02681C13.2821 9.01015 13.2029 9.02425 13.1376 9.06601C13.0722 9.10777 13.0262 9.17376 13.0095 9.24947C12.9929 9.32518 13.007 9.40441 13.0487 9.46972C13.0905 9.53504 13.1565 9.58109 13.2322 9.59774C13.6291 9.67829 14.0304 9.73548 14.434 9.76902V10.2086C14.202 10.2888 14.0092 10.4541 13.8945 10.6711L13.0381 12.3011C13.0165 12.3386 13.0037 12.3806 13.0007 12.4238C12.9977 12.467 13.0046 12.5104 13.0208 12.5505C13.037 12.5907 13.0622 12.6266 13.0944 12.6556C13.1265 12.6846 13.1649 12.7059 13.2065 12.7179L14.0629 12.9862V16.0493C14.0674 16.304 14.1721 16.5466 14.3544 16.7245C14.5366 16.9025 14.7816 17.0014 15.0363 16.9999H17.8282C18.0844 17.0037 18.3316 16.9058 18.5157 16.7276C18.6998 16.5494 18.8057 16.3055 18.8102 16.0493V12.9748L19.6666 12.7036C19.7064 12.6909 19.7429 12.6697 19.7736 12.6413C19.8042 12.613 19.8283 12.5783 19.8441 12.5396C19.8599 12.501 19.867 12.4593 19.8649 12.4176C19.8629 12.3759 19.8517 12.3352 19.8322 12.2983L19.8265 12.3011ZM16.4323 9.86323C16.929 9.86323 17.4086 9.8461 17.8596 9.81755V10.1487H17.4799C17.4042 10.1487 17.3316 10.1788 17.2781 10.2323C17.2246 10.2858 17.1945 10.3584 17.1945 10.4342C17.1826 10.6279 17.0973 10.8098 16.9559 10.9427C16.8146 11.0757 16.6278 11.1497 16.4337 11.1497C16.2396 11.1497 16.0529 11.0757 15.9115 10.9427C15.7701 10.8098 15.6848 10.6279 15.6729 10.4342C15.6729 10.3584 15.6429 10.2858 15.5893 10.2323C15.5358 10.1788 15.4632 10.1487 15.3875 10.1487H15.0049V9.81755C15.456 9.8461 15.9356 9.86323 16.4323 9.86323ZM18.4305 12.4924C18.3704 12.5112 18.3182 12.5494 18.282 12.6011C18.2459 12.6527 18.2278 12.7149 18.2307 12.7778V16.0607C18.2234 16.1619 18.1777 16.2565 18.1028 16.325C18.0279 16.3935 17.9297 16.4307 17.8282 16.429H15.0363C14.9316 16.4328 14.8295 16.3951 14.7525 16.3239C14.6755 16.2528 14.6297 16.154 14.6253 16.0493V12.7664C14.6282 12.7035 14.6101 12.6413 14.574 12.5897C14.5378 12.538 14.4856 12.4998 14.4255 12.481L13.7032 12.2526L14.3998 10.9337C14.41 10.9176 14.4214 10.9024 14.434 10.8881V11.0051C14.434 11.0808 14.4641 11.1534 14.5176 11.2069C14.5712 11.2605 14.6438 11.2906 14.7195 11.2906C14.7952 11.2906 14.8678 11.2605 14.9213 11.2069C14.9749 11.1534 15.0049 11.0808 15.0049 11.0051V10.7196H15.1334C15.2099 11.0056 15.3787 11.2584 15.6136 11.4387C15.8484 11.619 16.1362 11.7167 16.4323 11.7167C16.7284 11.7167 17.0161 11.619 17.251 11.4387C17.4859 11.2584 17.6546 11.0056 17.7312 10.7196H17.8596V11.0051C17.8596 11.0808 17.8897 11.1534 17.9432 11.2069C17.9968 11.2605 18.0694 11.2906 18.1451 11.2906C18.2208 11.2906 18.2934 11.2605 18.3469 11.2069C18.4005 11.1534 18.4305 11.0808 18.4305 11.0051V10.8881C18.4432 10.9033 18.4547 10.9195 18.4648 10.9366L19.1613 12.264L18.4305 12.4924ZM17.8596 12.7179C17.8596 12.7936 17.8295 12.8662 17.776 12.9197C17.7225 12.9733 17.6499 13.0034 17.5741 13.0034H17.0032C16.9275 13.0034 16.8549 12.9733 16.8014 12.9197C16.7478 12.8662 16.7177 12.7936 16.7177 12.7179C16.7177 12.6422 16.7478 12.5696 16.8014 12.516C16.8549 12.4625 16.9275 12.4324 17.0032 12.4324H17.5741C17.6499 12.4324 17.7225 12.4625 17.776 12.516C17.8295 12.5696 17.8596 12.6422 17.8596 12.7179Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.2"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Workshop Orders
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(17, "read") && (
              <Link to="/customer-feedback">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "customer-feedback"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="30" height="30"  />
                        <path
                          d="M11.4333 19.4804C9.8194 19.4804 8.50684 18.1678 8.50684 16.5539V15.5712C8.506 13.9573 9.81942 12.6448 11.4333 12.6448C13.0471 12.6448 14.3597 13.9573 14.3597 15.5712V16.5539C14.3597 18.1678 13.0471 19.4804 11.4333 19.4804ZM11.4333 13.2691C10.1643 13.2691 9.13118 14.3014 9.13118 15.5712V16.554C9.13118 17.8229 10.1643 18.8552 11.4333 18.8552C12.7022 18.8552 13.7353 17.8229 13.7353 16.5531V15.5704C13.7345 14.3023 12.7022 13.2691 11.4333 13.2691Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M17.0192 25.4574H5.76923C5.59634 25.4574 5.45703 25.3173 5.45703 25.1452V22.4429C5.45703 21.7236 5.91945 21.1009 6.60681 20.8928L9.62132 19.9033L10.2382 18.8425C10.3246 18.6931 10.516 18.6428 10.6653 18.7292C10.8147 18.8157 10.8651 19.007 10.7786 19.1564L10.1022 20.3196C10.0636 20.3859 10.0024 20.4354 9.92934 20.4597L6.79816 21.487C6.79564 21.4878 6.79312 21.4887 6.79061 21.4895C6.36678 21.6171 6.08144 21.9997 6.08144 22.442V24.8322H16.7063V22.442C16.7063 21.9997 16.4218 21.6162 15.9971 21.4895C15.9946 21.4887 15.9921 21.4878 15.9895 21.487L12.8584 20.4589C12.7803 20.4337 12.7157 20.3783 12.6779 20.3053L12.0795 19.1421C12.0006 18.9885 12.0611 18.8005 12.2147 18.7216C12.3682 18.6428 12.5562 18.7032 12.6351 18.8568L13.1747 19.9058L16.18 20.8919C16.8699 21.1009 17.3315 21.7228 17.3315 22.442V25.1443C17.3315 25.3172 17.1913 25.4574 17.0192 25.4574Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M11.3939 21.2142C10.7141 21.2142 10.0721 20.9204 9.62728 20.4052L9.59455 20.3674C9.48209 20.2365 9.49636 20.0393 9.62728 19.9268C9.7582 19.8143 9.95542 19.8286 10.0679 19.9595L10.1006 19.9973C10.4262 20.3749 10.8962 20.5898 11.3939 20.5898H11.4149C11.9201 20.5839 12.3934 20.3556 12.714 19.9654C12.824 19.832 13.0204 19.8126 13.1538 19.9218C13.2872 20.0309 13.3065 20.2281 13.1974 20.3615C12.7593 20.8953 12.1123 21.2058 11.4224 21.215C11.4132 21.2142 11.404 21.2142 11.3939 21.2142Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M15.1445 25.4574C14.9716 25.4574 14.8323 25.3172 14.8323 25.1452V23.2703C14.8323 23.0974 14.9724 22.9581 15.1445 22.9581C15.3174 22.9581 15.4567 23.0983 15.4567 23.2703V25.1452C15.4567 25.3173 15.3165 25.4574 15.1445 25.4574Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M7.64423 25.4574C7.47134 25.4574 7.33203 25.3172 7.33203 25.1452V23.2703C7.33203 23.0974 7.47218 22.9581 7.64423 22.9581C7.81711 22.9581 7.95642 23.0983 7.95642 23.2703V25.1452C7.95642 25.3173 7.8171 25.4574 7.64423 25.4574Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M16.3941 14.2074C16.3496 14.2074 16.3051 14.1981 16.2632 14.1788C16.1524 14.1277 16.0819 14.0169 16.0819 13.8943V12.3317H14.5192C14.3463 12.3317 14.207 12.1915 14.207 12.0195V5.76959C14.207 5.59671 14.3472 5.4574 14.5192 5.4574H25.144C25.3169 5.4574 25.4562 5.59755 25.4562 5.76959V12.0195C25.4562 12.1924 25.3161 12.3317 25.144 12.3317H18.6969L16.5971 14.1319C16.5401 14.1814 16.4671 14.2074 16.3941 14.2074ZM14.8314 11.7072H16.3941C16.567 11.7072 16.7063 11.8474 16.7063 12.0194V13.2153L18.3781 11.7827C18.4351 11.7332 18.5073 11.7072 18.582 11.7072H24.8319V6.08165H14.8314L14.8314 11.7072Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M18.6408 10.471C18.5912 10.471 18.5409 10.4592 18.4956 10.4349L17.7226 10.0287L16.9497 10.4349C16.8448 10.4903 16.7164 10.481 16.6207 10.4114C16.5242 10.3417 16.4763 10.2234 16.4965 10.1059L16.6442 9.24483L16.0189 8.63555C15.9333 8.55246 15.9031 8.42826 15.94 8.31495C15.977 8.20166 16.0743 8.11941 16.1927 8.10262L17.0571 7.97674L17.444 7.19373C17.4943 7.08714 17.6034 7.01917 17.7226 7.01917C17.8418 7.01917 17.95 7.0863 18.0029 7.19373L18.3898 7.97674L19.2542 8.10262C19.3717 8.11941 19.4699 8.20249 19.5068 8.31495C19.5438 8.42825 19.5127 8.55247 19.428 8.63555L18.8027 9.24483L18.9504 10.1059C18.9706 10.2234 18.9227 10.3417 18.8262 10.4114C18.77 10.4508 18.7054 10.471 18.6408 10.471ZM17.7226 9.36318C17.7721 9.36318 17.8225 9.37493 17.8678 9.39927L18.2262 9.58726L18.1582 9.18861C18.1406 9.08706 18.1741 8.98384 18.248 8.91165L18.5375 8.62967L18.1372 8.57176C18.0357 8.55665 17.9476 8.49287 17.9022 8.40055L17.7226 8.038L17.5439 8.40055C17.4985 8.49287 17.4104 8.55665 17.3089 8.57176L16.9085 8.62967L17.1981 8.91165C17.2719 8.98383 17.3055 9.08705 17.2879 9.18861L17.2199 9.58726L17.5783 9.39927C17.6228 9.37493 17.6723 9.36318 17.7226 9.36318Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                        <path
                          d="M22.8598 10.471C22.8102 10.471 22.7599 10.4592 22.7146 10.4349L21.9416 10.0287L21.1687 10.4349C21.0637 10.4903 20.9354 10.481 20.8397 10.4114C20.7432 10.3417 20.6953 10.2234 20.7155 10.1059L20.8632 9.24483L20.2379 8.63555C20.1523 8.55246 20.1221 8.42826 20.159 8.31495C20.196 8.20166 20.2933 8.11941 20.4117 8.10262L21.2761 7.97674L21.663 7.19373C21.7133 7.08714 21.8224 7.01917 21.9416 7.01917C22.0608 7.01917 22.169 7.0863 22.2219 7.19373L22.6088 7.97674L23.4732 8.10262C23.5907 8.11941 23.6889 8.20249 23.7258 8.31495C23.7628 8.42825 23.7317 8.55247 23.647 8.63555L23.0217 9.24483L23.1694 10.1059C23.1896 10.2234 23.1417 10.3417 23.0452 10.4114C22.989 10.4508 22.9244 10.471 22.8598 10.471ZM21.9416 9.36318C21.9911 9.36318 22.0415 9.37493 22.0868 9.39927L22.4452 9.58726L22.3772 9.18861C22.3596 9.08706 22.3931 8.98384 22.467 8.91165L22.7565 8.62967L22.3562 8.57176C22.2547 8.55665 22.1666 8.49287 22.1212 8.40055L21.9416 8.038L21.7629 8.40055C21.7175 8.49287 21.6294 8.55665 21.5279 8.57176L21.1275 8.62967L21.4171 8.91165C21.4909 8.98383 21.5245 9.08705 21.5069 9.18861L21.4389 9.58726L21.7973 9.39927C21.8409 9.37493 21.8913 9.36318 21.9416 9.36318Z"
                          fill="#cb9ad7"
                          stroke="#cb9ad7"
                          stroke-width="0.3"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Customer Feedback
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(18, "read") && (
              <Link to="/contact-requests">
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "contact-requests"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <svg
                        width="26"
                        height="24"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.7231 0H10.8849C9.81426 0 8.97144 0.865604 8.97144 1.91344V6.58314C8.97144 7.63098 9.81426 8.4738 10.8621 8.49658V9.65831C10.8621 10.1822 11.181 10.6378 11.6594 10.8428C11.8188 10.9112 11.9783 10.9339 12.1605 10.9339C12.5022 10.9339 12.8211 10.7973 13.0717 10.5467L15.1446 8.4738H19.7687C20.8393 8.4738 21.6821 7.6082 21.6821 6.56036V1.93622C21.6366 0.865604 20.771 0 19.7231 0ZM20.2926 6.60592C20.2926 6.92483 20.0193 7.19818 19.7004 7.19818H14.8256C14.6434 7.19818 14.484 7.26651 14.3473 7.40319L12.1833 9.54442V7.83599C12.1833 7.47153 11.8872 7.1754 11.5227 7.1754H10.9077C10.5887 7.1754 10.3154 6.90205 10.3154 6.58314V1.93622C10.3154 1.61731 10.5887 1.34396 10.9077 1.34396H19.7459C20.0648 1.34396 20.3382 1.61731 20.3382 1.93622V6.60592H20.2926Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M12.4339 5.19363C12.9497 5.19363 13.3679 4.77549 13.3679 4.25968C13.3679 3.74388 12.9497 3.32574 12.4339 3.32574C11.9181 3.32574 11.5 3.74388 11.5 4.25968C11.5 4.77549 11.9181 5.19363 12.4339 5.19363Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M15.3041 5.19363C15.8199 5.19363 16.238 4.77549 16.238 4.25968C16.238 3.74388 15.8199 3.32574 15.3041 3.32574C14.7883 3.32574 14.3701 3.74388 14.3701 4.25968C14.3701 4.77549 14.7883 5.19363 15.3041 5.19363Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M18.1515 5.19363C18.6673 5.19363 19.0854 4.77549 19.0854 4.25968C19.0854 3.74388 18.6673 3.32574 18.1515 3.32574C17.6357 3.32574 17.2175 3.74388 17.2175 4.25968C17.2175 4.77549 17.6357 5.19363 18.1515 5.19363Z"
                          fill="#cb9ad7"
                        />
                        <path
                          d="M13.869 14.5102L12.0694 13.0752C11.6822 12.7563 11.1811 12.5968 10.7027 12.5968C10.0649 12.5968 9.44985 12.8702 9.01705 13.3713C8.92593 13.4852 8.85759 13.5535 8.78926 13.6446C8.53869 13.4852 8.12866 13.1891 7.46807 12.5285C6.80748 11.8679 6.51135 11.4579 6.3519 11.2073C6.42024 11.139 6.51135 11.0706 6.62525 10.9795C7.53641 10.205 7.67308 8.86105 6.92137 7.92711L5.46352 6.12756C5.03071 5.60364 4.41568 5.28474 3.73231 5.28474C3.43618 5.28474 3.14005 5.35307 2.84393 5.46697C2.09222 5.78588 1.04438 6.69704 0.839369 6.92483C-0.550152 8.31435 0.087661 10.3645 0.611579 11.4351C1.27217 12.8246 2.45668 14.3964 4.02844 15.9681C5.53185 17.4715 8.42479 20 10.9305 20C11.7733 20 12.525 19.7039 13.0717 19.1572C13.2995 18.9294 14.2107 17.9043 14.5296 17.1526C14.9168 16.2187 14.6435 15.1253 13.869 14.5102ZM13.2995 16.6059C13.0945 17.1071 12.3656 17.9727 12.1378 18.2005C11.8189 18.5194 11.4088 18.656 10.9305 18.656C9.40429 18.656 7.14916 17.1982 4.96238 15.0114C2.115 12.164 0.474905 9.15717 1.77331 7.85877C2.0011 7.63098 2.88948 6.90205 3.36784 6.67426C3.48174 6.6287 3.59563 6.60592 3.70953 6.60592C3.98288 6.60592 4.23345 6.71982 4.3929 6.94761L5.82798 8.74715C6.12411 9.11162 6.07855 9.65831 5.71409 9.95444C5.34962 10.2733 5.09905 10.5011 5.03071 10.5695C4.48402 11.1162 5.28128 12.2551 6.48857 13.4624C7.42251 14.3964 8.33367 15.1025 8.94871 15.1025C9.13094 15.1025 9.26762 15.0569 9.38151 14.9203C9.44985 14.8519 9.67764 14.6014 9.99654 14.2369C10.1788 14.0319 10.4293 13.918 10.6571 13.918C10.8394 13.918 11.0444 13.9863 11.2038 14.1002L13.0034 15.5353C13.3451 15.8087 13.459 16.2415 13.2995 16.6059Z"
                          fill="#cb9ad7"
                        />
                      </svg>
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Contact Request
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
