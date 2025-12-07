import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const AddProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [previews, setPreviews] = useState([]);
  const { register, handleSubmit } = useForm();

  const handlePreview = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...urls]);
  };

  const handleAddProduct = async (data) => {
    const images = Array.from(data.images);
    console.log(images);
    const image_URL_API = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST
    }`;

    let imageURLs = [];

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("image", images[i]);

      const res = await axios.post(image_URL_API, formData);
      imageURLs.push(res.data.data.url);
    }

    const productDetails = {
      name: data.productName,
      category: data.category,
      price: data.price,
      available_quantity: data.availableQuantity,
      description: data.productDescription,
      minimum_order_quantity: data.minimumOrder,
      image: imageURLs,
      demo_video: data.demoVideo,
      payment_option: data.paymentOption,
    };

    axiosSecure.post("/products", productDetails).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Product Added Successfully",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-12">Add Products</h2>

      {/* Table */}
      <div className="max-w-10/12 mx-auto">
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <fieldset className="fieldset flex-1">
              {/* Products Name */}
              <label className="font-bold text-md">Product Name</label>
              <input
                type="text"
                {...register("productName")}
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

              {/* Available Quantity */}
              <label className="font-bold text-md">Available Quantity</label>
              <input
                type="number"
                {...register("availableQuantity")}
                className="input w-full mb-4  bg-white"
                placeholder="Quantity"
              />

              {/* Product Description */}
              <label className="font-bold text-md">Product Description</label>
              <textarea
                {...register("productDescription")}
                className="border border-[#d1d1d1] p-1 rounded-md mb-4 bg-white"
                name=""
                id=""
                rows="6"
                placeholder="Description"></textarea>
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset flex-1">
              {/* Minimum order quantity */}
              <label className="font-bold text-md">
                Minimum order quantity
              </label>
              <input
                type="number"
                {...register("minimumOrder")}
                className="input w-full mb-4  bg-white"
                placeholder="Quantity"
              />

              {/* Product Image */}
              <label className="font-bold text-md">Image</label>
              <p className="text-[10px] text-gray-500">Select image pressing 'Ctrl' button.</p>
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

              {/* Receiver Email */}
              <label className="font-bold text-md">Demo Video</label>
              <input
                type="text"
                {...register("demoVideo")}
                className="input w-full mb-4  bg-white"
                placeholder="Email"
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
          <button className="btn btn-primary text-black">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
