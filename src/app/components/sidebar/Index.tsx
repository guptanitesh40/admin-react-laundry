import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdCategory, MdLocalLaundryService } from "react-icons/md";
import { FaProductHunt, FaBuilding, FaImages, FaUsers } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { RiBuilding2Fill, RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LiaUserCircle } from "react-icons/lia";
import { CiShop } from "react-icons/ci";
import { IoIosPricetags } from "react-icons/io";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { BsBoxSeam } from "react-icons/bs";
import { useGetUserPermissions, usePermissions } from "../../hooks";
import { useSelector } from "react-redux";

export const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const { hasPermission } = usePermissions();
  const roleId = useSelector((state: any) => state.auth.role_id);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedItem(path);
  }, [location]);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

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
        <Link to="/dashboard" onClick={() => handleItemClick("dashboard")}>
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
            <Link to="/dashboard" onClick={() => handleItemClick("dashboard")}>
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
                    <i className="ki-filled ki-element-11 text-lg"></i>
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Dashboard
                  </span>
                </div>
              </div>
            </Link>

            {hasPermission(2, "read") && (
              <Link to="/settings" onClick={() => handleItemClick("settings")}>
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
                      <li className="ki-filled ki-setting-2 text-lg"></li>
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
                  className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[17px] pl-[10px] pr-[10px] py-[6px] ml-1"
                  tabIndex={0}
                >
                  <BsBoxSeam color="#cb9ad7" size={20} />
                  <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                    Orders
                  </span>
                  <span className="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                    <i className="ki-filled ki-plus text-2xs menu-item-show:hidden"></i>
                    <i className="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex"></i>
                  </span>
                </div>

                <div className="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[56px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                  <Link to="/orders" onClick={() => handleItemClick("/orders")}>
                    <div
                      className={`menu-item ${getSubmenuItemClass("/orders")}`}
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

                  <Link
                    to="/pickup-orders"
                    onClick={() => handleItemClick("/pickup-orders")}
                  >
                    <div
                      className={`menu-item ${getSubmenuItemClass(
                        "/pickup-orders"
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

                  <Link
                    to="/delivered-orders"
                    onClick={() => handleItemClick("/delivered-orders")}
                  >
                    <div
                      className={`menu-item ${getSubmenuItemClass(
                        "/delivered-orders"
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

                  <Link
                    to="/booking-orders"
                    onClick={() => handleItemClick("/booking-orders")}
                  >
                    <div
                      className={`menu-item ${getSubmenuItemClass(
                        "/booking-orders"
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
              <Link to="/payments" onClick={() => handleItemClick("payments")}>
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
                      <FaMoneyBillTransfer color="#cb9ad7" size={25} />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Payments
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(5, "read") && (
              <Link to="/category" onClick={() => handleItemClick("category")}>
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
                      <MdCategory size={22} color="#cb9ad7" />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Category
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(6, "read") && (
              <Link to="/product" onClick={() => handleItemClick("product")}>
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
                      <FaProductHunt size={22} color="#cb9ad7" />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Product
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(7, "read") && (
              <Link to="/services" onClick={() => handleItemClick("services")}>
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
                      <MdLocalLaundryService size={25} color="#cb9ad7" />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Services
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(8, "read") && (
              <Link
                to="/customers"
                onClick={() => handleItemClick("customers")}
              >
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
                      <FaUsers size={24} color="#cb9ad7" />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Customers
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(9, "read") && (
              <Link to="/coupon" onClick={() => handleItemClick("coupon")}>
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
                      <BiSolidCoupon color="#cb9ad7" size={25} />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Coupon
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(10, "read") && (
              <Link to="/price" onClick={() => handleItemClick("price")}>
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
                      <RiMoneyRupeeCircleLine color="#cb9ad7" size={25} />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Price
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(11, "read") && (
              <Link
                to="/price-content"
                onClick={() => handleItemClick("/price-content")}
              >
                <div
                  className={`menu-item transition-colors duration-200 ${getItemClass(
                    "/price-content"
                  )}`}
                >
                  <div
                    className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                    tabIndex={0}
                  >
                    <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                      <IoIosPricetags color="#cb9ad7" size={25} />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Price Content
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(12, "read") && (
              <Link
                to="/companies"
                onClick={() => handleItemClick("companies")}
              >
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
                      <RiBuilding2Fill color="#cb9ad7" size={23} />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Company
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(13, "read") && (
              <Link to="/branches" onClick={() => handleItemClick("branches")}>
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
                      <FaBuilding color="#cb9ad7" size={20} />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Branch
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(14, "read") && (
              <Link to="/banner" onClick={() => handleItemClick("banner")}>
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
                      <FaImages color="#cb9ad7" size={23} />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Banner
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div
              className="menu-item"
              data-menu-item-toggle="accordion"
              data-menu-item-trigger="click"
            >
              <div
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[17px] pl-[10px] pr-[10px] py-[6px] ml-1"
                tabIndex={0}
              >
                <LiaUserCircle color="#cb9ad7" size={28} />
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Users and Roles
                </span>
                <span className="menu-arrow text-gray-400 w-[20px] shrink-0 justify-end ml-1 mr-[-10px]">
                  <i className="ki-filled ki-plus text-2xs menu-item-show:hidden"></i>
                  <i className="ki-filled ki-minus text-2xs hidden menu-item-show:inline-flex"></i>
                </span>
              </div>

              <div className="menu-accordion gap-0.5 pl-[10px] relative before:absolute before:left-[56px] before:top-0 before:bottom-0 before:border-l before:border-gray-200">
                <Link to="/users" onClick={() => handleItemClick("/users")}>
                  <div className={`menu-item ${getSubmenuItemClass("/users")}`}>
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

                {roleId === 1 && (
                  <Link to="/roles" onClick={() => handleItemClick("/roles")}>
                    <div
                      className={`menu-item ${getSubmenuItemClass("/roles")}`}
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
                )}
              </div>
            </div>

            {hasPermission(15, "read") && (
              <Link
                to="/workshops"
                onClick={() => handleItemClick("workshops")}
              >
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
                      <CiShop size={28} color="#cb9ad7" />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Workshops
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(16, "read") && (
              <Link
                to="/workshop-order"
                onClick={() => handleItemClick("workshop-order")}
              >
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
                      <CiShop size={28} color="#cb9ad7" />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Workshop Orders
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(17, "read") && (
              <Link
                to="/customer-feedback"
                onClick={() => handleItemClick("customer-feedback")}
              >
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
                      <VscFeedback size={25} color="#cb9ad7" />
                    </span>
                    <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Customer Feedback
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
