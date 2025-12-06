import React from "react";
import banner from "../../../assets/view-from-flat-lay-woman-style-accessories-red-knitted-sweater-checkered-flannel-shirt-denim-jeans-hat-autumn-fashion-trend-vintage-photo-camera-traveler-outfit.jpg";

const Banner = () => {
  return (
    <div>
      <div className="relative">
        <img
          className="w-full lg:h-[450px] h-[200px] object-cover"
          src={banner}
          alt=""
        />
      </div>
      <div className="max-w-8/12 mx-auto absolute left-20 top-30 lg:left-55 lg:top-60 md:left-40 text-secondary">
        <p className="w-full md:w-8/12 mx-auto text-[10px] md:text-sm lg:w-8/12 top-[100px] lg:top-60 lg:right-80 font-semibold">
          Fashion is part of the daily air and it changes all the time, with all
          the events. You can even see the approaching of a revolution in
          clothes. You can see and feel everything in clothes.
        </p>
        <button className="top-20 lg:left-70 lg:top-20 md:left-24 absolute btn mr-3 text-secondary bg-primary/50 border-none">View Products</button>
        <button className="top-20 left-35 lg:left-105 lg:top-20 md:left-60 absolute btn bg-primary/50 border-none text-secondary">Book Products</button>
      </div>
    </div>
  );
};

export default Banner;
