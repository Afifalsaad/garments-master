import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useAuth();
  const modalRef = useRef();
  const { role } = useRole();
  const { register, handleSubmit } = useForm();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSuspend = async (data) => {
    console.log("selected User", selectedUser);
    console.log("data", data);
    const reason = {
      reason: data.reason,
      feedback: data.feedback,
    };

    await axiosSecure
      .post(`/suspend/${selectedUser._id}`, reason)
      .then((res) => {
        if (res.data.insertedId) {
          console.log("suspend");
        }
      });
  };

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

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
    <div>
      <h2 className="text-4xl font-bold">Manage User</h2>

      {/* // Table */}
      <div className="overflow-x-auto">
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
            {users.map((user, index) => (
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
                    {role === "Manager" ? (
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
                      className="btn bg-[#CD5C5C] text-white border-none ml-1">
                      Suspend
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
    </div>
  );
};

export default ManageUser;
