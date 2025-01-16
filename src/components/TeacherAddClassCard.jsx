import PropTypes from "prop-types";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const TeacherAddClassCard = ({ item, onUpdate, onDelete, onViewDetails }) => {
  const { title, name, email, price, description, image, status } = item;

  return (
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
      <div className="card-body p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        {/* Posted By */}
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <FaUserCircle size={20} />
          <span className="font-medium">{name}</span>
        </div>

        {/* Email */}
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-semibold">Email:</span> {email}
        </p>

        {/* Price */}
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-semibold">Price:</span> ${price}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3">{description}</p>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-3">
          {/* Update Button */}
          <button
            onClick={onUpdate}
            className="btn bg-[#4CAF50] hover:bg-green-700 text-white rounded-lg px-4 py-2 shadow-md transition"
          >
            Update
          </button>

          {/* Delete Button */}
          <button
            onClick={onDelete}
            className="btn bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 shadow-md transition"
          >
            Delete
          </button>

          {/* See Details Button */}
          <button
            onClick={onViewDetails}
            className="btn bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg px-4 py-2 shadow-md flex items-center gap-2 transition"
          >
            See Details <AiOutlineArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

TeacherAddClassCard.propTypes = {
  item: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default TeacherAddClassCard;
