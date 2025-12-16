import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useAuth();
  const modalRef = useRef();
  const { register, handleSubmit } = useForm();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data);
      return res.data;
    },
  });

  const filteredUsers = users
    .filter((user) => {
      const text = searchUser.toLowerCase();

      return user.userName?.toLowerCase().includes(text);
    })
    .filter((user) => {
      if (filterUser === "All" || filterUser === "") {
        return true;
      }
      return user.role === filterUser;
    });

  const handleSuspend = async (data) => {
    const reason = {
      reason: data.reason,
      feedback: data.feedback,
    };

    await axiosSecure
      .post(`/suspend/${selectedUser._id}`, reason)
      .then((res) => {
        if (res.data.insertedId) {
          modalRef.current.close();
          refetch();
          console.log(res.data);
        }
      });
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    modalRef.current.showModal();
  };

  const handleApprove = (user) => {
    const updatedRole = {
      role: "Manager",
      status: "approved",
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to add ${user.userName} as an manager?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, updatedRole)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Approved",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="text-secondary">
      <h2 className="text-4xl font-bold text-center mb-3">Manage User</h2>
      <div className="flex flex-col md:flex-row md:justify-between my-2 md:items-center">
        {/* Search Box */}
        <label className="input my-6">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchUser(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search Order"
          />
        </label>

        {/* Status */}
        <div className="w-40">
          <fieldset className="fieldset">
            <select
              defaultValue={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="select">
              <option>All</option>
              <option>admin</option>
              <option>Manager</option>
              <option>Buyer</option>
            </select>
          </fieldset>
        </div>
      </div>

      {/* // Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.role}</td>
                {loggedInUser?.email === user?.userEmail ? (
                  ""
                ) : (
                  <td>
                    {user.role === "Manager" ? (
                      <button
                        disabled={true}
                        className="btn bg-[#98bbb0] hover:cursor-not-allowed text-white border-none">
                        {" "}
                        Approved{" "}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(user)}
                        className="btn bg-[#40826D] text-white border-none">
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => handleShowModal(user)}
                      disabled={user.role === "suspended"}
                      className="btn bg-[#CD5C5C] text-white border-none ml-1 hover:cursor-pointer disabled:bg-[#f2a7a7] disabled:hover:cursor-not-allowed">
                      {user.role === "suspended" ? "Suspended" : "Suspend"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Suspend</h3>
          <form onSubmit={handleSubmit(handleSuspend)}>
            <fieldset className="fieldset">
              <label className="label">Suspend Reason</label>
              <select
                {...register("reason")}
                defaultValue="Suspend Reason"
                className="select">
                <option disabled={true}>Suspend Reason</option>
                <option>Violation of Platform Rules</option>
                <option>Inappropriate or Abusive Behavior</option>
                <option>Fraudulent or Suspicious Activity</option>
                <option>Multiple Policy Warnings Ignored</option>
              </select>
              <p className="label">Details</p>
              <textarea
                {...register("feedback")}
                className="textarea"
                placeholder="Feedback"></textarea>
            </fieldset>
            <button className="btn bg-[#CD5C5C] text-white border-none mt-2">
              Suspend
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Responsive Cards */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="p-4 border rounded-lg shadow-sm bg-base-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar">
                <div className="mask mask-squircle h-14 w-14">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <h3 className="font-semibold">{user.userName}</h3>
            </div>
            <h2>
              <span className="font-semibold"></span>Email: {user.userEmail}
            </h2>

            <p>
              <span className="font-semibold">Role: </span> {user.role}
            </p>
            <div className="mt-3">
              {loggedInUser?.email === user?.userEmail ? (
                ""
              ) : (
                <td>
                  {user.role === "Manager" ? (
                    <button
                      disabled={true}
                      className="btn bg-[#98bbb0] hover:cursor-not-allowed text-white border-none">
                      {" "}
                      Approved{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(user)}
                      className="btn bg-[#40826D] text-white border-none">
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleShowModal(user)}
                    disabled={user.role === "suspended"}
                    className="btn bg-[#CD5C5C] text-white border-none ml-1 hover:cursor-pointer disabled:bg-[#f2a7a7] disabled:hover:cursor-not-allowed">
                    {user.role === "suspended" ? "Suspended" : "Suspend"}
                  </button>
                </td>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
