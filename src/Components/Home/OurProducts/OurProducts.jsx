import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSpinner from "../../../Pages/Loading/Loading";

const OurProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/all-products-limited?show_on_home=true"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-11/12 mx-auto pt-5 p-6">
      <h2 className="text-4xl font-bold text-center py-8">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center text-left">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center p-6 text-left justify-center rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:cursor-pointer">
            <div>
              <img
                src={product.image}
                alt="Jacket"
                className=" h-[200px] rounded-xl"
              />
            </div>

            <div className="">
              <h2 className="my-2">
                {/* <span className="text-[10px] text-gray-800">Name: </span> */}
                <span className="text-xl font-bold">{product.name}</span>
              </h2>

              <h2 className="my-1">
                {" "}
                <span className="text-[#4a586a]">Price: </span>
                <span className="text-green-600 font-semibold">
                  {product.price}/-
                </span>
              </h2>
              <p className="my-1 line-clamp-2">
                <span className="font-bold">Desc:</span> {product.description}
              </p>
              <div className="card-actions mt-2">
                <button className="px-3 py-1 border border-[#dfdfdf] text-sm hover:border-black">
                  L
                </button>
                <p className="px-3 py-1 border text-sm">M</p>
                <p className="px-3 py-1 border text-sm">XL</p>
                <p className="px-3 py-1 border text-sm">XXL</p>
              </div>
              <div>
                <Link
                  to={`/productDetails/${product._id}`}
                  className="btn bg-primary/70 hover:bg-primary w-full mt-5 text-black">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/all-products">
          <button className="btn hover:bg-primary/50 border border-primary px-8 my-6 bg-none text-center">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OurProducts;
