import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const PendingOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["pending-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/pending-orders?email=${user?.email}&status=pending&payment_status=paid`
      );
      console.log(orders);
      return res.data;
    },
  });

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
      <div className="overflow-x-auto">
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
