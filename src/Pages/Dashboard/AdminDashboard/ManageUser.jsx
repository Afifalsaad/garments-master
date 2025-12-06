import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleShowModal = () => {
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
              console.log("role updated");
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
                    onClick={handleShowModal}
                    className="btn bg-[#CD5C5C] text-white border-none ml-1">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
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
