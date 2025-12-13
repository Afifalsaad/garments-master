import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [] } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/pending-orders?email=${user?.email}&status=pending`
      );
      return res.data;
    },
  });

  const approveOrder = (order) => {
    axiosSecure.patch(`approve-order/${order._id}`).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Approved",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-3">
        Pending Orders: {orders.length}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th key={index + 1}>1</th>
                <td>{order.id}</td>
                <td>{order.email}</td>
                <td>{order.title}</td>
                <td>{order.order_quantity}</td>
                <td>{new Date(order.orderedAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => approveOrder(order)}
                    className="btn bg-[#40826D] text-white border-none hover:cursor-pointer">
                    Approve
                  </button>
                  <button className="btn bg-[#CD5C5C] text-white border-none ml-1 hover:cursor-pointerF">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
