import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdCategory, MdLocalLaundryService } from "react-icons/md";
import { FaProductHunt, FaBuilding, FaImages } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { RiBuilding2Fill, RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LiaUserCircle } from "react-icons/lia";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { CiShop } from "react-icons/ci";
import { IoIosPricetags } from "react-icons/io";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

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

  return (
    <div
      className="sidebar scrollbar-hide dark:bg-coal-600 bg-light border-r border-r-gray-200 dark:border-r-coal-100 fixed top-0 bottom-0 hidden lg:flex flex-col items-stretch shrink-0"
      data-drawer="true"
      data-drawer-class="drawer drawer-start top-0 bottom-0"
      data-drawer-enable="true|lg:false"
      id="sidebar"
    >
      <div
        className="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0"
        id="sidebar_header"
      >
        <img
          className="default-logo min-h-[22px] max-w-none"
          src="/media/app/Group 34972.png"
        />       
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
          <div className="menu flex flex-col grow gap-0.5" id="sidebar_menu">
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

            <Link to="/orders" onClick={() => handleItemClick("orders")}>
              <div
                className={`menu-item transition-colors duration-200 ${getItemClass(
                  "orders"
                )}`}
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                  tabIndex={0}
                >
                  <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                    <HiMiniPencilSquare color="gray" size={31} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Orders
                  </span>
                </div>
              </div>
            </Link>

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
                    <FaMoneyBillTransfer color="gray" size={31} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Payments
                  </span>
                </div>
              </div>
            </Link>

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
                    <MdCategory size={24} color="gray" />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </span>
                </div>
              </div>
            </Link>

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
                    <FaProductHunt size={24} color="gray" />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Product
                  </span>
                </div>
              </div>
            </Link>

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
                    <MdLocalLaundryService size={30} color="gray" />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Services
                  </span>
                </div>
              </div>
            </Link>

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
                    <BiSolidCoupon color="gray" size={32} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Coupon
                  </span>
                </div>
              </div>
            </Link>

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
                    <RiMoneyRupeeCircleLine color="gray" size={32} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Price
                  </span>
                </div>
              </div>
            </Link>

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
                    <IoIosPricetags color="gray" size={30} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Price Content
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/companies" onClick={() => handleItemClick("companies")}>
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
                    <RiBuilding2Fill color="gray" size={25} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Company
                  </span>
                </div>
              </div>
            </Link>

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
                    <FaBuilding color="gray" size={25} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Branch
                  </span>
                </div>
              </div>
            </Link>

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
                    <FaImages color="gray" size={25} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Banner
                  </span>
                </div>
              </div>
            </Link>            

            <Link to="/user" onClick={() => handleItemClick("user")}>
              <div
                className={`menu-item transition-colors duration-200 ${getItemClass(
                  "user"
                )}`}
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                  tabIndex={0}
                >
                  <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                    <LiaUserCircle color="gray" size={33} />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Users
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/workshops" onClick={() => handleItemClick("workshops")}>
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
                    <CiShop size={33} color="gray" />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Workshops
                  </span>
                </div>
              </div>
            </Link>

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
                    <CiShop size={33} color="gray" />
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Workshop Orders
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
