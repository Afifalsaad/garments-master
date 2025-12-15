import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const TrackOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [] } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders?email=${user?.email}`);
      console.log(res.data.trackingId);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-4xl font-bold text-center">Track Order</h2>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Total</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.title}</td>
                <td>{order.order_price}</td>
                <td>{order.payment_option}</td>
                <td>
                  <Link to={`/trackings-log/${order.trackingId}`}>
                    <button className="btn bg-cyan-500 text-white border-none hover:cursor-pointer mx-1">
                      Track Order
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

export default TrackOrder;
