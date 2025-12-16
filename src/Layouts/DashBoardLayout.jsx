import React, { useEffect } from "react";
import Navbar from "../Components/Home/Navbar/Navbar";
import { Link, Outlet, useLocation } from "react-router";
import { FaRegUser, FaShoppingCart, FaUsersCog } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdBorderColor, MdOutlinePendingActions } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import useRole from "../Hooks/useRole";
import { IoSettings } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { FaTruckFast } from "react-icons/fa6";

const DashBoardLayout = () => {
  const { role } = useRole();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;

    if (path === "/dashboard") {
      document.title = "DashBoard";
    } else if (path.startsWith("/dashboard/track-order")) {
      document.title = "Track Order";
    } else if (path === "/dashboard/my-orders") {
      document.title = "My Orders";
    } else if (path === "/dashboard/payment-success") {
      document.title = "Payment Success";
    } else if (path === "/dashboard/payment-cancelled") {
      document.title = "Payment Cancelled";
    } else if (path === "/dashboard/manage-user") {
      document.title = "Manage user";
    } else if (path === "/dashboard/all-products-admin") {
      document.title = "All Products";
    } else if (path === "/dashboard/all-orders") {
      document.title = "All Orders";
    } else if (path === "/dashboard/add-products") {
      document.title = "Add Products";
    } else if (path === "/dashboard/manage-products") {
      document.title = "Manage Products";
    } else if (path === "/dashboard/pending-orders") {
      document.title = "Pending Orders";
    } else if (path === "/dashboard/approved-orders") {
      document.title = "Approved Orders";
    }
  }, [location.pathname]);

  return (
    <div className="text-secondary">
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-primary/10">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost">
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 font-semibold">Dashboard</div>
          </nav>
          {/* Page content here */}
          <div className="p-4 bg-primary/10 min-h-screen">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-primary/10  is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow bg-yellow-100 lg:bg-primary/5">
              {/* List item */}
              <Link to="/dashboard">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Homepage">
                    {/* Home icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4">
                      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    <span className="is-drawer-close:hidden">Homepage</span>
                  </button>
                </li>
              </Link>
              {/* List item */}
              {/* Manage User */}
              {role === "admin" && (
                <>
                  <Link to="/dashboard/manage-user">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="manage user">
                        {/* Icon */}
                        <FaUsersCog />
                        <span className="is-drawer-close:hidden">
                          Manage Users
                        </span>
                      </button>
                    </li>
                  </Link>
                </>
              )}

              {/* All Products */}
              {role === "admin" && (
                <>
                  <Link to="/dashboard/all-products-admin">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="all products">
                        {/* Icon */}
                        <AiFillProduct />
                        <span className="is-drawer-close:hidden">
                          All Products
                        </span>
                      </button>
                    </li>
                  </Link>
                </>
              )}
              {/* All Orders */}
              {role === "admin" && (
                <>
                  <Link to="/dashboard/all-orders">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="all orders">
                        {/* Icon */}
                        <MdBorderColor />
                        <span className="is-drawer-close:hidden">
                          All Orders
                        </span>
                      </button>
                    </li>
                  </Link>
                </>
              )}
              {/* Manager Only Routes */}
              {/* Add Products */}
              {role === "Manager" && (
                <>
                  <Link to="/dashboard/add-products">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="add products">
                        {/* Icon */}
                        <IoMdAddCircle />
                        <span className="is-drawer-close:hidden">
                          Add Products
                        </span>
                      </button>
                    </li>
                  </Link>
                </>
              )}
              {/* Manage Products */}
              {role === "Manager" && (
                <>
                  <Link to="/dashboard/manage-products">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="manage products">
                        {/* Icon */}
                        <IoSettings />
                        <span className="is-drawer-close:hidden">
                          Manage Products
                        </span>
                      </button>
                    </li>
                  </Link>
                </>
              )}
              {/* Pending orders */}
              {role === "Manager" && (
                <>
                  <Link to="/dashboard/pending-orders">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="pending orders">
                        {/* Icon */}
                        <MdOutlinePendingActions />
                        <span className="is-drawer-close:hidden">
                          Pending Orders
                        </span>
                      </button>
                    </li>
                  </Link>
                </>
              )}
              {/* Approved orders */}
              {role === "Manager" && (
                <>
                  <Link to="/dashboard/approved-orders">
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="approved orders">
                        {/* Icon */}
                        <SiTicktick />
                        <span className="is-drawer-close:hidden">
                          Approved Orders
                        </span>
                      </button>
                    </li>
                  </Link>
                </>
              )}
              {/* Buyer Only */}
              {/* My Orders */}
              {role === "Buyer" && (
                <Link to="/dashboard/my-orders">
                  <li>
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Orders">
                      {/* Icon */}
                      <FaShoppingCart />
                      <span className="is-drawer-close:hidden">My Orders</span>
                    </button>
                  </li>
                </Link>
              )}
              {/* Track Order */}
              {role === "Buyer" && (
                <Link to="track-order">
                  <li>
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="track order">
                      {/* Icon */}
                      <FaTruckFast />
                      <span className="is-drawer-close:hidden">
                        Track Order
                      </span>
                    </button>
                  </li>
                </Link>
              )}
              {/* Profile */}
              <Link to="/my-profile">
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="my profile">
                    {/* Icon */}
                    <FaRegUser />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
