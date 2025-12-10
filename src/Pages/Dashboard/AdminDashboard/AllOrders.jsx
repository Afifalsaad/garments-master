import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [selectedOrder, setSelectedOrder] = useState();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-orders");
      console.log(res.data);
      return res.data;
    },
  });

  const handleModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };
  return (
    <div>
      {/* {loading && (
        <div className="fixed h-screen inset-0 bg-white/50 flex items-center justify-center z-50 rounded-lg backdrop:bg-none">
          <LoadingSpinner />
        </div>
      )} */}
      <h2 className="text-4xl font-bold text-center py-12">
        All Orders: {orders.length}
      </h2>
      <div className="hidden md:block">
        {/* Large Screen Table */}
        <table className="table w-full">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.first_name} {order.last_name}
                    </td>
                    <td>{order.title}</td>
                    <td>{order.order_quantity}</td>
                    <td></td>
                    <td>
                      <button
                        onClick={() => handleModal(order)}
                        className="btn bg-cyan-500 text-white border-none hover:cursor-pointer">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-bold text-center mb-2">Details</h2>
          {/* Table */}
          <h2 className="font-bold">
            Order ID:{" "}
            <span className="text-gray-400 font-[10px]">
              {selectedOrder?._id}
            </span>
          </h2>

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
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar">
                <div className="mask mask-squircle h-14 w-14">
                  <img src={order.image?.[0]} />
                </div>
              </div>
              <h3 className="font-semibold">{order.name}</h3>
            </div>

            <p>
              <span className="font-semibold">Price:</span> {order.price}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {order.category}
            </p>
            <p>
              <span className="font-semibold">Created:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
