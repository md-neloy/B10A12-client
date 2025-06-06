import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import TeacherClsDetaisModal from "./TeacherClsDetaisModal";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContexHooks from "../useHooks/useContexHooks";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TeacherAddClassCard = ({ item, refetch }) => {
  const { title, name, email, price, description, image, status } = item;
  const [selectedClass, setSelectedClass] = useState(null);
  const { user } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const openModal = (classData) => {
    setSelectedClass(classData);
  };
  const closeModal = () => {
    setSelectedClass(null);
  };
  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-class/${id}?email=${user?.email}`)
          .then((res) => {
            console.log(res);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <div className="card w-full bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 shadow-xl rounded-lg overflow-hidden">
        {/* Image Section */}
        <figure className="relative">
          <img src={image} alt={title} className="w-full h-56 object-cover" />
          <span
            className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
              status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            } shadow`}
          >
            {status}
          </span>
        </figure>

        {/* Card Body */}
        <div className="card-body p-6 flex-col ">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <FaUserCircle size={20} />
            <span className="font-medium">{name}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold">Email:</span> {email}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold">Price:</span> ${price}
          </p>

          <p className="text-sm text-gray-600 mt-3">
            {description.split(" ").slice(0, 20).join(" ")}...
          </p>

          {/* Buttons Section */}
          <div className="mt-6 flex flex-wrap gap-3">
            {/* Update Button */}
            <button
              onClick={() => openModal(item)}
              className="btn bg-[#4CAF50] hover:bg-green-700 text-white rounded-lg px-4 py-2 shadow-md transition"
            >
              Update
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(item._id)}
              className="btn bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 shadow-md transition"
            >
              Delete
            </button>

            {/* See Details Button */}
            <button
              // onClick={onViewDetails}
              disabled={item.status !== "approved"}
              className="btn bg-gray-100 hover:bg-gray-200 w-full md:w-fit text-gray-800 rounded-lg  shadow-md p-0 transition"
            >
              <Link
                to={`/dashboard/teacherSeeDetails/${item._id}`}
                className="px-4 py-2  flex gap-2"
              >
                <span>See Details</span> <AiOutlineArrowRight size={16} />
              </Link>
            </button>
          </div>
        </div>
      </div>
      {selectedClass && (
        <TeacherClsDetaisModal
          classData={selectedClass}
          refetch={refetch}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

TeacherAddClassCard.propTypes = {
  item: PropTypes.object,
  refetch: PropTypes.func,
  // onViewDetails: PropTypes.func.isRequired,
};

export default TeacherAddClassCard;
