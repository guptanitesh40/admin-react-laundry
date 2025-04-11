import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/authSlice";
import { RootState } from "../../utils/store";
import SendPaymentLinkModal from "../sidebar/SendPaymentLinkModal";
import { RiShareForwardFill } from "react-icons/ri";
import { usePermissions } from "../../hooks";

interface HeaderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  const handleMobileNavClick = () => {
    setIsOpen(true);
  };

  if (!user || !user.user_id) return null;

  return (
    <header
      className="header fixed top-0 z-10 left-0 right-0 flex items-stretch shrink-0 bg-[#fefefe] dark:bg-coal-500 border-b border-gray-200"
      data-sticky="true"
      data-sticky-class="shadow-sm dark:border-b dark:border-b-coal-100"
      data-sticky-name="header"
      id="header"
    >
      <div
        className="container-fixed flex items-stretch lg:gap-4"
        id="header_container"
      >
        <div className="flex gap-1 lg:hidden items-center -ml-1">
          <Link className="shrink-0" to="/dashboard">
            <img className="max-h-[25px] w-full" src="/media/app/Favicon.png" />
          </Link>
          <div className="flex items-center">
            <button
              className="btn btn-icon btn-light btn-clear btn-sm"
              // data-drawer-toggle="#sidebar"
              onClick={handleMobileNavClick}
            >
              <i className="ki-filled ki-menu"></i>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-10 justify-end flex-1">
          {hasPermission(3, "read") && (
            <button
              className="btn btn-sm btn-primary payment-btn"
              onClick={() => setModalOpen(true)}
            >
              <RiShareForwardFill className="w-4 h-4 text-blue-600" />
              Request Payment
            </button>
          )}

          <div className="menu" data-menu="true">
            <div
              className="menu-item"
              data-menu-item-offset="20px, 10px"
              data-menu-item-placement="bottom-end"
              data-menu-item-toggle="dropdown"
              data-menu-item-trigger="click|lg:click"
            >
              <div className="menu-toggle btn btn-icon rounded-full">
                <img
                  alt=""
                  className="size-9 rounded-full border-2 border-success shrink-0"
                  src="/media/images/blank.png"
                />
              </div>

              <div className="menu-dropdown menu-default light:border-gray-300 w-full max-w-[250px] margin-x">
                <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                  <div className="flex items-center gap-2">
                    <img
                      alt=""
                      className="size-9 rounded-full border-2 border-success"
                      src="/media/images/blank.png"
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-800 font-semibold leading-none">
                        {user.first_name} {user.last_name}
                      </span>
                      <span className="text-xs text-gray-600 font-medium leading-none">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="menu-separator"></div>

                <div className="flex flex-col">
                  <div className="menu-item">
                    <button
                      className="menu-link"
                      onClick={() => navigate("/profile")}
                      role="navigation"
                      data-menu-item-toggle="dropdown"
                      data-menu-item-trigger="click|lg:click"
                    >
                      <span className="menu-icon">
                        <i className="ki-filled ki-profile-circle"></i>
                      </span>
                      <span className="menu-title">My Profile</span>
                    </button>
                  </div>
                </div>

                <div className="menu-separator"></div>

                <div className="flex flex-col">
                  <div className="menu-item px-4 py-1.5 items-center">
                    <button
                      className="btn btn-sm btn-light"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SendPaymentLinkModal
        onClose={() => setModalOpen(false)}
        modalOpen={modalOpen}
      />
    </header>
  );
};
