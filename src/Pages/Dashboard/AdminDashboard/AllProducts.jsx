import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-products");

      return res.data.result;
    },
  });

  const handleShowOnHome = (product) => {
    console.log(product);
    axiosSecure.patch(`/show-on-home/${product._id}`, product).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        console.log("updated");
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center py-12">All Products</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Show on home</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product.image[0]} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold"></div>
                      <div className="text-sm opacity-50"></div>
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
                <td>
                  <input
                    checked={
                      product.show_on_home === true ||
                      product.show_on_home === "true"
                    }
                    onChange={() => handleShowOnHome(product)}
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
