import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: product = [] } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/productDetails/${id}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-primary-10 rounded-2xl shadow-lg p-6 md:p-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="w-full h-[420px] bg-primary/20 p-6 rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <p className="text-gray-600 text-sm mb-4">
                Category:{" "}
                <span className="font-semibold">{product.category}</span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price & Stock */}
              <div className="space-y-3 mb-6">
                <p className="text-xl font-semibold text-green-600">
                  Price: {product.price} tk/-
                </p>
                <p className="text-gray-700">
                  Available Quantity:{" "}
                  <span className="font-semibold">
                    {product.available_quantity}
                  </span>
                </p>
                <p className="text-gray-700">
                  Minimum Order:{" "}
                  <span className="font-semibold">
                    {product.minimum_order_quantity}
                  </span>
                </p>
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Payment Options: {product.payment_option}
                </h3>
              </div>
            </div>

            {/* Order Button */}
            <div>
              <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition">
                Order / Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Demo Video Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Demo Video</h2>
          <div className="w-full h-80 bg-black rounded-xl overflow-hidden flex items-center justify-center">
            <video controls className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
