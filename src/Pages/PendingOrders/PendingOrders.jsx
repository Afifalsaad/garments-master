import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const PendingOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState();
  const modalRef = useRef();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["pending-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/pending-orders?email=${user?.email}&status=pending&payment_status=paid`
      );
      return res.data;
    },
  });

  const { data: currentUser = [] } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/status?email=${user.email}`);
      return res.data;
    },
  });

  const handleModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };

  const approveOrder = (order) => {
    const approvedInfo = {
      trackingId: order.trackingId,
    };
    axiosSecure
      .patch(`approve-order/${order._id}`, approvedInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Approved",
            icon: "success",
          });
        }
      });
  };

  const rejectOrder = (order) => {
    axiosSecure.patch(`reject-order/${order._id}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Rejected",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="text-secondary">
      <h2 className="text-4xl font-bold text-center mb-3">
        Pending Orders: {orders.length}
      </h2>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.id}</td>
                <td>{order.email}</td>
                <td>{order.title}</td>
                <td>{order.order_quantity}</td>
                <td>{new Date(order.orderedAt).toLocaleDateString()}</td>
                <td>
                  <button
                    disabled={currentUser.status === "suspended"}
                    onClick={() => approveOrder(order)}
                    className="btn bg-[#40826D] text-white border-none hover:cursor-pointer disabled:bg-[#9CC8BB] disabled:hover:cursor-not-allowed ">
                    Approve
                  </button>
                  <button
                    disabled={currentUser.status === "suspended"}
                    onClick={() => rejectOrder(order)}
                    className="btn bg-[#CD5C5C] text-white border-none ml-1 hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:bg-[#E6A3A3]">
                    Reject
                  </button>
                  <button
                    onClick={() => handleModal(order)}
                    className="btn bg-cyan-500 text-white border-none hover:cursor-pointer mx-1">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-bold text-center mb-2">Details</h2>
          {/* Table */}
          <div className="overflow-x-auto">
            <h2 className="font-bold">
              Order ID:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?._id}
              </span>
            </h2>
            <h2 className="font-bold">
              Title:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.title}
              </span>
            </h2>
            <h2 className="font-bold">
              Price:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.price} BDT
              </span>
            </h2>
            <h2 className="font-bold">
              Customer Name:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.first_name} {selectedOrder?.last_name}
              </span>
            </h2>
            <h2 className="font-bold">
              Ordered Quantity:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.order_quantity}
              </span>
            </h2>
            <h2 className="font-bold">
              Total:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.order_price}
              </span>
            </h2>
            <h2 className="font-bold">
              Contact No.:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.number}
              </span>
            </h2>
            <h2 className="font-bold">
              Address:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.address}
              </span>
            </h2>
            <h2 className="font-bold">
              Note:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.note}
              </span>
            </h2>
            <h2 className="font-bold">
              Status:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.status}
              </span>
            </h2>
            <h2 className="font-bold">
              Payment Option:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.payment_option}
              </span>
            </h2>
            <h2 className="font-bold">
              Payment Status:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.payment_status}
              </span>
            </h2>
            <h2 className="font-bold">
              Ordered At:{" "}
              <span className="text-gray-500 font-[10px]">
                {selectedOrder?.orderedAt}
              </span>
            </h2>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Responsive Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 border rounded-lg shadow-sm bg-base-100">
            <h2>Order ID: {order.id}</h2>

            <p>
              <span className="font-semibold">User: </span> {order.email}
            </p>
            <p>
              <span className="font-semibold">Product: </span> {order.title}
            </p>
            <p>
              <span className="font-semibold">Quantity: </span>
              {order.order_quantity}
            </p>
            <p>
              <span className="font-semibold">Order Date: </span>
              {new Date(order.orderedAt).toLocaleDateString()}
            </p>
            <div className="mt-3">
              <button
                onClick={() => approveOrder(order)}
                className="btn bg-[#40826D] text-white border-none hover:cursor-pointer">
                Approve
              </button>
              <button
                onClick={() => rejectOrder(order)}
                className="btn bg-[#CD5C5C] text-white border-none ml-1 hover:cursor-pointerF">
                Reject
              </button>
              <Link to="/dashboard/my-orders">
                <button className="btn bg-cyan-500 text-white border-none hover:cursor-pointer mx-1">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
