import React from "react";
import ThemeSwitcher from "../../../ThemeSwitcher/SwitchTheme";
import { Link, NavLink } from "react-router";
import Logo from "../../../Pages/Shared/Logo";
import useAuth from "../../../Hooks/useAuth";
import { RxAvatar } from "react-icons/rx";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        {
          Swal.fire({
            title: "Logout Successful",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">All-Product</NavLink>
      </li>
      <li>
        <NavLink to="/">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2">
              {links}
            </ul>
          </div>
          <Link to="/">
            <Logo></Logo>
          </Link>
        </div>
        <ThemeSwitcher></ThemeSwitcher>
        <div className="navbar-end hidden lg:flex font-semibold">
          <div>
            <ul className="menu menu-horizontal">{links}</ul>
          </div>

          <div>
            <div>
              {user ? (
                <div className="relative flex items-center gap-4 group mr-3">
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary text-black hover:cursor-pointer">
                    Logout
                  </button>

                  <button>
                    {user.photoURL ? (
                      <img
                        className="w-9 h-9 object-cover rounded-full hover:cursor-pointer"
                        src={user.photoURL}
                        alt="avatar"
                      />
                    ) : (
                      <RxAvatar className="text-3xl hover:cursor-pointer text-black" />
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-primary text-black mx-2 hover:cursor-pointer">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary text-black hover:cursor-pointer">
                    Register
                  </Link>
                </>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
