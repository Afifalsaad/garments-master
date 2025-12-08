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
import PrivateRoute from "./PrivateRoute";
import OrderProduct from "../Pages/OrderProduct/OrderProduct";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import PaymentSuccessful from "../Pages/Dashboard/Payments/PaymentSuccessful";
import PaymentCanceled from "../Pages/Dashboard/Payments/PaymentCanceled";
import AdminRoute from "./AdminRoute";

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
        path: "/productDetails/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/order-product/:id",
        element: (
          <PrivateRoute>
            <OrderProduct></OrderProduct>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccessful></PaymentSuccessful>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <PrivateRoute>
            <PaymentCanceled></PaymentCanceled>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageUser></ManageUser>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "all-products-admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllProducts></AllProducts>
            </AdminRoute>
          </PrivateRoute>
        ),
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
