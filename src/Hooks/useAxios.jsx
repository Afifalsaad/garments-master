import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://assignment-11-server-nine-pearl.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
