import PropTypes from "prop-types";
import Button from "../../Sharecomponent/Button";

const AllClassesCard = ({ item }) => {
  return (
    <div>
      <div
        className="card card-compact bg-[#E9ECEF] w-full h-full shadow-xl relative"
        data-aos="zoom-in"
      >
        <span className="absolute top-2 right-4 text-white font-bold text-xl bg-[#388E3C] rounded-md p-2">
          Enroll: {item.enroll}
        </span>
        <figure>
          <img
            src={item.image}
            alt="Class"
            className="w-full lg:h-[350px] object-cover"
          />
        </figure>
        <div className="flex flex-col p-3 justify-between shadow-xl">
          {/* Card Content */}
          <div className="flex-1">
            {/* Title */}
            <div className="flex">
              <h2 className="w-1/4">Title</h2>
              <h2 className="flex-1">: {item.title}</h2>
            </div>
            {/* Name */}
            <div className="flex">
              <h2 className="w-1/4">Name</h2>
              <h2 className="flex-1">: {item.name}</h2>
            </div>
            {/* Price */}
            <div className="flex">
              <h2 className="w-1/4">Price</h2>
              <h2 className="flex-1">: {item.price}</h2>
            </div>
            {/* Description */}
            <div className="flex">
              <h2 className="w-1/4">Description</h2>
              <h2 className="flex-1">: {item.description}</h2>
            </div>
            {/* Card Actions */}
            <div className="card-actions mt-auto p-3 ">
              <Button
                text="Enroll"
                width="100%"
                link={`/details/${item._id}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClassesCard;
AllClassesCard.propTypes = {
  item: PropTypes.object,
};
