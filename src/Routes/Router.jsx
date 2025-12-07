import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser";
import AllOrders from "../Pages/Dashboard/AdminDashboard/AllOrders";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddProducts from "../Pages/Dashboard/ManagerDashboard/AddProducts";
import AllProductsHome from "../Pages/AllProducts/AllProductsHome";
import AllProducts from "../Pages/Dashboard/AdminDashboard/AllProducts";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "all-products",
        Component: AllProductsHome,
      },
      {
        path: '/productDetails/:id',
        Component: ProductDetails
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashBoardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "manage-user",
        Component: ManageUser,
      },
      {
        path: "all-products-admin",
        Component: AllProducts,
      },
      {
        path: "all-orders",
        Component: AllOrders,
      },
      {
        path: "add-products",
        Component: AddProducts,
      },
    ],
  },
]);
