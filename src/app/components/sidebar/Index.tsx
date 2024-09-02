import React from 'react';
import { Link } from 'react-router-dom';
import { MdCategory, MdLocalLaundryService } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { BiSolidCoupon } from 'react-icons/bi';

export const Sidebar: React.FC = () => {

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
        <a className="dark:hidden" href="html/demo1.html">
          <img
            className="default-logo min-h-[22px] max-w-none"
            src="/media/app/default-logo.svg"
          />
        </a>
        <a className="hidden dark:block" href="html/demo1.html">
          <img
            className="default-logo min-h-[22px] max-w-none"
            src="/media/app/default-logo-dark.svg"
          />
          <img
            className="small-logo min-h-[22px] max-w-none"
            src="/media/app/mini-logo.svg"
          />
        </a>
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
                className="menu-item hover:bg-gray-50 transition-colors duration-200"
                data-menu-item-toggle="accordion"
                data-menu-item-trigger="click"
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                  tabIndex={0}
                >
                  <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                    <i className="ki-filled ki-element-11 text-lg"></i>
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                    Dashboard
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/category">
              <div
                className="menu-item hover:bg-gray-50 transition-colors duration-200"
                data-menu-item-toggle="accordion"
                data-menu-item-trigger="click"
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                  tabIndex={0}
                >
                  <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                    <MdCategory size={24}/>            
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                    Category
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/product">
              <div
                className="menu-item hover:bg-gray-50 transition-colors duration-200"
                data-menu-item-toggle="accordion"
                data-menu-item-trigger="click"
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                  tabIndex={0}
                >
                  <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                    <FaProductHunt size={24}/>
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                    Product
                  </span>
                </div>
              </div>
            </Link>

        <Link to="/services">
        <div
          className="menu-item hover:bg-gray-50 transition-colors duration-200"
          data-menu-item-toggle="accordion"
          data-menu-item-trigger="click"
        >
          <div
            className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
            tabIndex={0}
          >
            <span className="menu-icon items-start text-gray-500 dark:text-gray-400 ">
            <MdLocalLaundryService size={22} />            
            </span>
            <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
              <Link to="/services">Services</Link>
            </span>
            
            <Link to="/coupon">
              <div
                className="menu-item hover:bg-gray-50 transition-colors duration-200"
                data-menu-item-toggle="accordion"
                data-menu-item-trigger="click"
              >
                <div
                  className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                  tabIndex={0}
                >
                  <span className="menu-icon flex items-center justify-center text-gray-500 dark:text-gray-400 w-[32px] h-[32px]">
                    <BiSolidCoupon color='gray' size={32}/>
                  </span>
                  <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                    Coupon
                  </span>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
        </Link>

        </div>
        </div>
      </div>
    </div>
  );
};
