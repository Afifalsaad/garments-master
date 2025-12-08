import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Login = () => {
  const { googleSignIn, loginUser, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Logged In",
          icon: "success",
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const loggedInUser = result.user;
        const userInfo = {
          userName: loggedInUser.displayName,
          userEmail: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "Buyer",
          status: "pending",
          createdAt: new Date().toLocaleString(),
        };
        //   Add user to database
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Logged In",
              icon: "success",
            });
          }
        });
        Swal.fire({
          title: "Logged In",
          icon: "success",
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  <label className="label">Password</label>
                  <input
                    {...register("password")}
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-primary text-black">Login</button>
                </fieldset>
              </form>
              <p>
                New here?{" "}
                <Link to="/register">
                  <span className="underline hover:cursor-pointer">
                    Register
                  </span>
                </Link>
              </p>

              {/* Google SignIn */}
              <button
                onClick={handleGoogleLogin}
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

export default Login;
