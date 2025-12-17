import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import LoadingSpinner from "../Loading/Loading";
import useRole from "../../Hooks/useRole";

const ManageProducts = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef();

  const { register, handleSubmit, reset } = useForm();
  const { data, refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-products?email=${user.email}`);
      return res.data;
    },
  });

  const products = Array.isArray(data) ? data : [];

  const openModal = (product) => {
    setSelectedProduct(product);
    modalRef.current.showModal();
  };

  const handlePreview = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...urls]);
  };

  const handleUpdate = async (data) => {
    modalRef.current.close();
    try {
      setLoading(true);
      const images = Array.from(data.images);
      const image_URL_API = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST
      }`;
      const video_URL_API = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST
      }`;

      const imageUploadPromises = images.map((img) => {
        const formData = new FormData();
        formData.append("image", img);
        return axios.post(image_URL_API, formData);
      });

      const imageResponses = await Promise.all(imageUploadPromises);
      const imageURLs = imageResponses.map((res) => res.data.data.url);

      let videoURLs = [];

      if (data.demoVideo?.length > 0) {
        const videoUploadPromises = Array.from(data.demoVideo).map((video) => {
          const formData = new FormData();
          formData.append("image", video);
          return axios.post(video_URL_API, formData);
        });

        const videoResponses = await Promise.all(videoUploadPromises);
        videoURLs = videoResponses.map((res) => res.data.data.url);
      }

      const updatedInfo = {
        name: data.name,
        description: data.description,
        category: data.category,
        image: imageURLs,
        demo_video: videoURLs,
        payment_option: data.paymentOption,
        updated_by: role,
      };

      const res = await axiosSecure.patch(
        `/updateProduct/${selectedProduct._id}`,
        updatedInfo
      );
      if (res.data.modifiedCount) {
        setLoading(false);
        refetch();
        setPreviews([]);
        reset();
        Swal.fire({
          title: "Info Updated",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${product.name}from list?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-product/${product._id}`);
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
    <div className="text-secondary">
      {loading && (
        <div className="fixed h-screen inset-0 bg-white/50 flex items-center justify-center z-50 rounded-lg backdrop:bg-none">
          <LoadingSpinner />
        </div>
      )}
      <h2 className="text-4xl font-bold text-center mb-3">
        Manage Products: {products.length}
      </h2>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product.image?.[0]} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.payment_option}</td>
                <th>
                  <button
                    onClick={() => openModal(product)}
                    className="btn bg-[#40826D] text-white border-none hover:cursor-pointer">
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(product)}
                    className="btn bg-[#CD5C5C] text-white border-none ml-1 hover:cursor-pointerF">
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-bold text-center mb-2">Update</h2>
          {/* Table */}
          <div className="max-w-10/12 mx-auto">
            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <fieldset className="fieldset flex-1">
                  {/* Products Name */}
                  <label className="font-bold text-md">Product Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="input w-full mb-4 bg-white"
                    placeholder="Name"
                  />

                  {/* Category */}
                  <label className="font-bold text-md">Category</label>
                  <select
                    {...register("category")}
                    defaultValue="Select a category"
                    className="select w-full mb-4  bg-white">
                    <option disabled={true}>Select a category</option>
                    <option>Shirt</option>
                    <option>Pant</option>
                    <option>Jacket</option>
                    <option>Accessories</option>
                  </select>

                  {/* Price */}
                  <label className="font-bold text-md">Price</label>
                  <input
                    type="number"
                    {...register("price")}
                    className="input w-full mb-4  bg-white"
                    placeholder="price"
                  />

                  {/* Product Description */}
                  <label className="font-bold text-md">
                    Product Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="border border-[#d1d1d1] p-1 rounded-md mb-4 bg-white"
                    rows="6"
                    placeholder="Description"></textarea>
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset flex-1">
                  {/* Product Image */}
                  <label className="font-bold text-md">Image</label>
                  <p className="text-[10px] text-gray-500">
                    Select image pressing 'Ctrl' button.
                  </p>
                  <input
                    type="file"
                    {...register("images")}
                    multiple={true}
                    onChange={(e) => handlePreview(e)}
                    className="file-input w-full mb-4"
                    placeholder="photo"
                  />

                  <div className="flex flex-wrap gap-4">
                    {previews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        onClick={() => window.open(src, "_blank")}
                        className="w-32 h-32 object-cover rounded-md border cursor-pointer"
                      />
                    ))}
                  </div>

                  {/* Demo Video */}
                  <label className="font-bold text-md">Demo Video</label>
                  <input
                    type="file"
                    {...register("demoVideo")}
                    className="file-input w-full mb-4  bg-white"
                    placeholder="Video"
                  />

                  {/* Payment Options */}
                  <label className="font-bold text-md">Payment Options</label>
                  <select
                    {...register("paymentOption")}
                    defaultValue="Select a option"
                    className="select w-full mb-4  bg-white">
                    <option disabled={true}>Select a option</option>
                    <option>Cash on Delivery</option>
                    <option>PayFast</option>
                  </select>
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

      {/* Responsive Cards */}
      <div className="md:hidden space-y-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg shadow-sm bg-base-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar">
                <div className="mask mask-squircle h-14 w-14">
                  <img src={product.image?.[0]} />
                </div>
              </div>
              <h3 className="font-semibold">{product.name}</h3>
            </div>

            <p>
              <span className="font-semibold">Price:</span> {product.price}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold">Payment Method: </span>
              {product.payment_option}
            </p>
            <div className="mt-3">
              <button
                onClick={() => openModal(product)}
                className="btn bg-[#40826D] text-white border-none hover:cursor-pointer">
                Update
              </button>

              <button
                onClick={() => handleDelete(product)}
                className="btn bg-[#CD5C5C] text-white border-none ml-1 hover:cursor-pointerF">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
