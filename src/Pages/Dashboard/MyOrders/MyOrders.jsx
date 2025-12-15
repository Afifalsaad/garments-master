import React, { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState([]);
  const modalRef = useRef();

  const { data: orders = [], refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders?email=${user?.email}`);
      console.log(orders);
      return res.data;
    },
  });

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    modalRef.current.showModal();
  };

  const handlePayment = async (order) => {
    const paymentInfo = {
      order_price: order.order_price,
      title: order.title,
      id: order._id,
      email: order.email,
      trackingId: order.trackingId,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  const handleDelete = async (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${order.title}from list?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-order/${order._id}`);
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-6">
        My Orders: {orders.length}
      </h2>

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
              <th>Payment Options</th>
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
                  {order.payment_status === "paid" ? (
                    <span className="text-green-400 font-bold">Paid</span>
                  ) : order.payment_option === "Cash on Delivery" ? (
                    <span className="text-red-400 font-bold">Unavailable</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(order)}
                      className="btn btn-primary btn-outline text-black">
                      Pay
                    </button>
                  )}
                </td>
                <td>
                  {order.status === "pending" ? (
                    <button
                      onClick={() => handleDelete(order)}
                      className="btn bg-[#CD5C5C] text-white border-none  hover:cursor-pointer mx-1">
                      Cancel Order
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => handleShowModal(order)}
                    className="btn bg-cyan-500 text-white border-none hover:cursor-pointer mx-1">
                    View Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
              <Link to={`/trackings-log/${selectedOrder.trackingId}`}>
                <button className="btn bg-cyan-500 text-white border-none hover:cursor-pointer my-1">
                  Track Order
                </button>
              </Link>
            </div>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyOrders;
