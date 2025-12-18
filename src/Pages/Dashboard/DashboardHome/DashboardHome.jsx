import React from "react";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../Loading/Loading";
import useRole from "../../../Hooks/useRole";
import AdminDashboard from "../../AdminDashboard/AdminDashboard";
import ManagerDashboard from "../../ManagerDashboard/ManagerDashboard";
import BuyerDashboard from "../../BuyerDashboard/BuyerDashboard";

const DashboardHome = () => {
  const { loading } = useAuth();
  const { role } = useRole();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "Manager") {
    return <ManagerDashboard></ManagerDashboard>;
  } else {
    return <BuyerDashboard></BuyerDashboard>;
  }
};

export default DashboardHome;
