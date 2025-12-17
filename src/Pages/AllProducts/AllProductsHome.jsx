import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSpinner from "../Loading/Loading";

const AllProductsHome = () => {
  const axiosSecure = useAxiosSecure();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 6;

  const {
    data: products = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-products?limit=${limit}&skip=${currentPage * limit}`
      );
      const totalProducts = res.data.totalProducts;
      setTotalProducts(totalProducts);

      const page = Math.ceil(totalProducts / limit);
      setTotalPage(page);
      return res.data.result;
    },
  });

  refetch();

  if (isLoading && isFetching) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-11/12 mx-auto pt-5 p-6 mb-10">
      <h2 className="text-4xl font-bold text-center py-8">
        All Products: <span className="text-yellow-700">{totalProducts}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center text-left">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-primary/20 flex flex-col items-center text-left justify-center p-6 rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:cursor-pointer">
            <div>
              <figure>
                <img
                  src={product.image}
                  alt="Jacket"
                  className=" h-[300px] rounded-xl"
                />
              </figure>
            </div>

            <div className="">
              <h2 className="my-2">
                {/* <span className="text-[10px] text-gray-800">Name: </span> */}
                <span className="text-xl font-bold">{product.name}</span>
              </h2>
              <h2 className="my-2">
                <span className="text-gray-600">Category: </span>{" "}
                <span className="font-bold text-[18px]">
                  {product.category}
                </span>
              </h2>
              <h2 className="my-1">
                <span className="text-gray-600">Price: </span>
                <span className="font-bold text-[16px]"> {product.price}</span>
              </h2>
              <h2 className="my-1">
                <span className="text-gray-600">Available Quantity: </span>
                <span className="font-bold text-[16px]">
                  {" "}
                  {product.available_quantity}
                </span>
              </h2>
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
      <div className="flex justify-center flex-wrap gap-3 mt-16">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn">
            Prev
          </button>
        )}

        {[...Array(totalPage).keys()].map((i) => (
          <div className="join">
            <button
              onClick={() => setCurrentPage(i)}
              className={`btn btn-square ${
                i === currentPage && "btn-outline"
              } btn-primary rounded-md text-black`}>
              {" "}
              {i + 1}
            </button>
          </div>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllProductsHome;
