import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/authSlice"; 

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    dispatch(logout());

    navigate("/signin");
  };

  return (
    <div className="">
      <h2>This is the Dashboard</h2>
      <button className="btn btn-primary flex justify-center grow" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashBoard;
