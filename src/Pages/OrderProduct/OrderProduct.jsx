import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const OrderProduct = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: product = [] } = useQuery({
    queryKey: ["orderQuantity", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/productDetails/${id}`);
      return res.data;
    },
  });

  const quantity = watch("orderQuantity");
  const totalPrice = product.price * quantity;
  const minimumOrderQuantity = product.minimum_order_quantity;
  const maximumOrderQuantity = product.available_quantity;

  useEffect(() => {
    if (product) {
      setValue("price", product.price);
      setValue("title", product.name);
      setValue("email", user?.email);
      setValue("orderPrice", totalPrice);
    }
  }, [product, setValue, totalPrice, user]);

  const handleOrderProduct = (data) => {
    const orderDetails = {
      id: id,
      email: user?.email,
      owner_email: product.email,
      title: data.title,
      price: data.price,
      first_name: data.firstName,
      last_name: data.lastName,
      order_quantity: data.orderQuantity,
      order_price: data.orderPrice,
      number: data.number,
      address: data.deliveryAddress,
      note: data.note,
      status: "pending",
      payment_option: product.payment_option,
      payment_status: "pending",
      show_on_home: false,
    };

    axiosSecure.post("/order-product", orderDetails).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Order Placed",
          icon: "success",
        });
        navigate("/dashboard/my-orders");
      }
    });
  };

  return (
    <div>
      <div className="bg-primary/20">
        <h2 className="text-4xl font-bold text-center py-12">Order Products</h2>

        {/* Table */}
        <div className="max-w-10/12 mx-auto">
          <form
            onSubmit={handleSubmit(handleOrderProduct)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 pb-10">
            <div>
              <fieldset className="fieldset flex-1">
                {/* Email */}
                <label className="font-bold text-md">Email</label>
                <input
                  defaultValue={user.email}
                  type="email"
                  {...register("email")}
                  className="input w-full mb-4 bg-white"
                  readOnly
                />

                {/* Title */}
                <label className="font-bold text-md">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  defaultValue={product.name}
                  className="input w-full mb-4 bg-white"
                  readOnly
                />

                {/* Price */}
                <label className="font-bold text-md">Price</label>
                <input
                  type="number"
                  {...register("price")}
                  className="input w-full mb-4 bg-white"
                  defaultValue={product.price}
                  readOnly
                />

                {/* First Name */}
                <label className="font-bold text-md">First Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="input w-full mb-4 bg-white"
                  placeholder="First Name"
                />

                {/* Last Name */}
                <label className="font-bold text-md">Last Name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="input w-full border border-[#d1d1d1] rounded-md mb-4 bg-white"
                  rows="6"
                  placeholder="Last Name"></input>
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset flex-1">
                {/* Order quantity */}
                <label className="font-bold text-md">Order quantity</label>
                <input
                  type="number"
                  {...register("orderQuantity", {
                    required: "Order Quantity Required",
                    min: {
                      value: minimumOrderQuantity,
                      message: `Order Quantity cannot be less than ${minimumOrderQuantity}`,
                    },
                    max: {
                      value: maximumOrderQuantity,
                      message: `Order Quantity cannot be larger than ${maximumOrderQuantity}`,
                    },
                  })}
                  className="input w-full bg-white"
                  placeholder="Quantity"
                />
                {errors.orderQuantity && (
                  <p className="text-red-500 mb-4">
                    {errors.orderQuantity.message}
                  </p>
                )}

                {/* Order Price */}
                <label className="font-bold text-md">Order Price</label>
                <input
                  type="number"
                  {...register("orderPrice")}
                  className="input w-full mb-4 bg-white"
                  defaultValue={totalPrice}
                  readOnly
                />

                {/* Number */}
                <label className="font-bold text-md">Contact Number</label>
                <input
                  type="number"
                  {...register("number")}
                  className="input w-full mb-4 bg-white"
                  placeholder="Number"
                />

                {/* Delivery Address */}
                <label className="font-bold text-md">Delivery Address</label>
                <input
                  type="text"
                  {...register("deliveryAddress")}
                  className="input w-full mb-4  bg-white"
                  placeholder="Delivery Address"
                />

                {/* Note */}
                <label className="font-bold text-md">Note</label>
                <textarea
                  {...register("note")}
                  className="textarea w-full mb-4  bg-white"
                  placeholder="Note here..."></textarea>
              </fieldset>
            </div>

            <button className="btn btn-primary w-full text-black">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
