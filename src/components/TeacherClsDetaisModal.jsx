import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import imageUpload from "../useHooks/imageUpload";
import useContexHooks from "../useHooks/useContexHooks";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { toast } from "react-toastify";

const TeacherClsDetaisModal = ({ classData, refetch, onClose }) => {
  const { user } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { image, ...fromData } = data;
    const imgUrl = await imageUpload(image[0]);
    fromData.image = imgUrl;
    // console.log(fromData);
    try {
      console.log(fromData);
      axiosSecure
        .patch(`/update-class/${classData._id}?email=${user?.email}`, fromData)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("successfully modified the class");
            reset();
            refetch();
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error("Submission failed:", err.message);
    }
  };
  return (
    <dialog id="my" className="modal !z-50" open>
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="card bg-base-100 w-full lg:flex-1 shadow-2xl p-2 md:p-6 rounded-lg">
          <form
            className="card-body p-2 md:p-4 m-0 md:space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Update {classData.title} Class
            </h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Title</span>
              </label>
              <input
                type="text"
                defaultValue={classData.title}
                placeholder="Enter class title"
                className="input input-bordered"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Price</span>
              </label>
              <input
                type="number"
                defaultValue={classData.price}
                placeholder="Enter class price"
                className="input input-bordered"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">
                  Description
                </span>
              </label>
              <textarea
                placeholder="Enter class description"
                defaultValue={classData.description}
                className="textarea textarea-bordered"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">
                  Add Image
                </span>
              </label>
              <div>
                <input
                  type="file"
                  {...register("image", { required: "Image is required" })}
                  className="file-input file-input-bordered w-full"
                />
                <span>
                  <FaCloudUploadAlt size={20} className="text-gray-500" />
                </span>
              </div>
              {errors.image && (
                <span className="text-red-500 text-sm">
                  {errors.image.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Add Class
              </button>
            </div>
          </form>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button onClick={onClose} className="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default TeacherClsDetaisModal;
TeacherClsDetaisModal.propTypes = {
  classData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};
