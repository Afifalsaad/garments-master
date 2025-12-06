import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import useAuth from "../../../Hooks/useAuth";
import { Link, Navigate, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile, googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const role = data.role;
    const ProfileImg = data.photo[0];
    const image_URL_API = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOST
    }`;
    registerUser(email, password).then((result) => {
      console.log(result.user);
      //   store the image
      const formData = new FormData();
      formData.append("image", ProfileImg);

      //   append the img to profile
      axios.post(image_URL_API, formData).then((res) => {
        const photoURL = res.data.data.url;
        const updatedProfile = {
          displayName: name,
          photoURL: res.data.data.url,
        };

        // update user profile
        updateUserProfile(updatedProfile)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });

        const userInfo = {
          userName: name,
          userEmail: email,
          photoURL: photoURL,
          role: role,
          status: "pending",
          createdAt: new Date().toLocaleString(),
        };

        //   Add user to database
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Registered Successfully",
              icon: "success",
            });
          }
        });
      });
    });
  };

  const handleGoogleRegistration = () => {
    googleSignIn()
      .then((res) => {
        const userInfo = {
          userName: res.user.name,
          userEmail: res.user.email,
          photoURL: res.user.photoURL,
          role: res.user.role,
          status: "pending",
          createdAt: new Date().toLocaleString(),
        };

        //   Add user to database
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              title: "Registered Successfully",
              icon: "success",
            });
            navigate("/");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    className="input"
                    placeholder="Name"
                  />
                  <label className="label">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  <label className="label">photoURL</label>
                  <input
                    {...register("photo")}
                    type="file"
                    className="file-input file-input-ghost"
                  />
                  <label className="label">Select Your Role</label>
                  <select {...register("role")} className="select select-ghost">
                    <option value="" disabled={true}>
                      Select a role
                    </option>
                    <option>Buyer</option>
                    <option>Manager</option>
                  </select>
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                      })}
                      className="input"
                      placeholder="Password"
                    />
                    <button
                      onClick={handleShowPassword}
                      className="btn border-none btn-xs absolute top-2 right-6">
                      {showPassword ? (
                        <IoMdEyeOff className="text-xl" />
                      ) : (
                        <IoMdEye className="text-xl" />
                      )}
                    </button>
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">Password is required.</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500">
                      Password must be 6 character long.
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500">
                      Password must have a big letter , a small latter , a
                      special character and a number.
                    </p>
                  )}
                  <button className="btn btn-primary text-black">
                    Register
                  </button>
                </fieldset>
                <div>
                  <p to="/login" className=" my-2">
                    Already have an account?
                    <Link to="/login">
                      <span className="underline mx-1">Login Now</span>
                    </Link>
                  </p>
                </div>
              </form>

              {/* Google Button */}
              <button
                onClick={handleGoogleRegistration}
                className="btn bg-white text-black border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
