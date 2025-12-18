import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "https://assignment-11-server-nine-pearl.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    // reqInterceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // resInterceptors
    const resInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          Swal.fire({
            title: "Access Denied",
            icon: "error",
          });
          // console.log("error made by me");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptors);
    };
  }, [user?.accessToken]);
  return axiosSecure;
};

export default useAxiosSecure;
