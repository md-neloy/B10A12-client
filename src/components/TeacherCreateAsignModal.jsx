import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const TeacherCreateAsignModal = ({ classId, closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <dialog id="my_modal_4" className="modal" open>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{classId}</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg-white rounded shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>

            {/* Assignment Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-medium mb-1">
                Assignment Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`input input-bordered w-full ${
                  errors.title ? "input-error" : ""
                }`}
                placeholder="Enter assignment title"
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>
            {/* Assignment Mark */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-medium mb-1">
                Assignment Mark
              </label>
              <input
                id="mark"
                type="number"
                {...register("mark", { required: "Title is required" })}
                className={`input input-bordered w-full ${
                  errors.title ? "input-error" : ""
                }`}
                placeholder="Enter assignment title"
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Assignment Deadline */}
            <div className="mb-4">
              <label
                htmlFor="deadline"
                className="block text-lg font-medium mb-1"
              >
                Assignment Deadline
              </label>
              <input
                id="deadline"
                type="date"
                {...register("deadline", { required: "Deadline is required" })}
                className={`input input-bordered w-full ${
                  errors.deadline ? "input-error" : ""
                }`}
              />
              {errors.deadline && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.deadline.message}
                </span>
              )}
            </div>

            {/* Assignment Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-1"
              >
                Assignment Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
                placeholder="Enter assignment description"
              />
              {errors.description && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Add Assignment Button */}
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Add Assignment
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TeacherCreateAsignModal;
TeacherCreateAsignModal.propTypes = {
  classId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
