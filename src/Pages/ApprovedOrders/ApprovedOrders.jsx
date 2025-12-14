import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ApprovedOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState();

  const { register, handleSubmit, reset } = useForm();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["approved-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `approved-order?email=${user?.email}&status=approved`
      );
      console.log(products);
      return res.data;
    },
  });

  const handleModal = (product) => {
    setSelectedProduct(product);
    modalRef.current.showModal();
  };

  const handleUpdate = (data) => {
    const approvedInfo = {
      location: data.location,
      date_time: new Date(data.date_time),
      status: data.status,
      trackingId: selectedProduct.trackingId,
    };
    axiosSecure
      .patch(`/tracking-log/${selectedProduct._id}`, approvedInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          reset();
          modalRef.current.close();
          Swal.fire({
            title: `Status Updated to ${data.status}`,
            icon: "success",
          });
        }
      });
  };

  return (
    <div className="text-secondary">
      <h2 className="text-4xl font-bold mb-3 text-center">
        Approved Orders: {products.length}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.id}</td>
                <td>{product.email}</td>
                <td>{product.title}</td>
                <td>{product.order_quantity}</td>
                <td>{new Date(product.approvedAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleModal(product)}
                    className="btn bg-cyan-500 text-white border-none hover:cursor-pointer mx-1">
                    Add Trackings
                  </button>
                  <Link to={`/trackings-log/${product.trackingId}`}>
                    <button className="btn bg-cyan-500 text-white border-none hover:cursor-pointer mx-1">
                      View Trackings
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}

        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            {/* Table */}
            <div className="max-w-10/12 mx-auto">
              <form
                onSubmit={handleSubmit(handleUpdate)}
                className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <fieldset className="fieldset flex-1">
                    {/* Location */}
                    <label className="font-bold text-md">Location</label>
                    <input
                      type="text"
                      {...register("location")}
                      className="input w-full mb-4 bg-white"
                      placeholder="Location"
                    />

                    {/* Note */}
                    <label className="font-bold text-md">Note</label>
                    <textarea
                      {...register("note")}
                      className="border border-[#d1d1d1] p-2 rounded-md mb-4 bg-white"
                      rows="4"
                      placeholder="Note"></textarea>

                    {/* Category */}
                    <label className="font-bold text-md">Status</label>
                    <select
                      {...register("status")}
                      defaultValue="Select a status"
                      className="select w-full mb-4  bg-white">
                      <option disabled={true}>Select a status</option>
                      <option>Cutting Completed</option>
                      <option>Sewing Started</option>
                      <option>Finishing</option>
                      <option>QC Checked</option>
                      <option>Packed</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
                    </select>
                  </fieldset>
                </div>

                <div>
                  <fieldset className="fieldset flex-1">
                    {/* Date/Time */}
                    <label className="font-bold text-md">Date/Time</label>
                    <input
                      type="datetime-local"
                      {...register("date_time")}
                      className="input w-full mb-4 bg-white"
                      placeholder="Date"
                    />
                  </fieldset>
                </div>
                <button type="submit" className="btn btn-primary text-black">
                  Submit
                </button>
              </form>
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

export default ApprovedOrders;
