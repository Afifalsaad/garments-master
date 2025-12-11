import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [selectedOrder, setSelectedOrder] = useState();
  const [searchOrder, setSearchOrder] = useState("");
  const [filterOrder, setFilterOrder] = useState("");

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-orders");
      return res.data;
    },
  });

  const filteredOrders = orders
    .filter((order) => {
      const text = searchOrder.toLowerCase();

      return order.title?.toLowerCase().includes(text);
    })
    .filter((order) => {
      if (filterOrder === "All" || filterOrder === "") {
        return true;
      }
      return order.status === filterOrder.toLowerCase();
    });

  const handleModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };
  return (
    <div>
      <h2 className="text-4xl font-bold text-center py-12">
        All Orders: {orders.length}
      </h2>

      <div className="flex justify-between my-2 items-center">
        {/* Search Box */}
        <label className="input my-6">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchOrder(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search Order"
          />
        </label>

        {/* Status */}
        <div className="w-40">
          <fieldset className="fieldset">
            <select
              defaultValue={filterOrder}
              onChange={(e) => setFilterOrder(e.target.value)}
              className="select">
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </fieldset>
        </div>
      </div>

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
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.first_name} {order.last_name}
                    </td>
                    <td>{order.title}</td>
                    <td>{order.order_quantity}</td>
                    <td>{order.status}</td>
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

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            </tbody>
          </table>
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
