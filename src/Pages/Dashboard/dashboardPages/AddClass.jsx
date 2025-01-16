import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import teacherAnimation from "./LottieFiles/teacher.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useContexHooks from "../../../useHooks/useContexHooks";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCloudUploadAlt } from "react-icons/fa";
import imageUpload from "../../../useHooks/imageUpload";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const { user } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const createPost = async (newpost) => {
    const response = await axiosSecure.post("/addClass", newpost);
    return response.data;
  };

  // Define the mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherPosts"]);
      toast.success("Class added successfully!", {
        position: "top-center",
      });
      reset();
      navigation("/dashboard/myclass");
    },
    onError: (error) => {
      toast.error(`Submission failed: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { image, ...fromData } = data;
    const imgUrl = await imageUpload(image[0]);
    fromData.image = imgUrl;
    fromData.status = "pending";
    fromData.enroll = 0;
    fromData.assignments = 0;
    fromData.submitedAssignments = 0;
    // console.log(fromData);
    try {
      mutation.mutateAsync(fromData);
    } catch (err) {
      console.error("Submission failed:", err.message);
    }
  };

  return (
    <div className="bg-base-200  flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>SmartLearning | Add Class</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center w-full ">
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="py-6 w-full max-w-md">
            <Lottie animationData={teacherAnimation} />
          </div>
        </div>
        <div className="card bg-base-100 w-full lg:flex-1 shadow-2xl p-2 md:p-6 rounded-lg">
          <form
            className="card-body p-2 md:p-4 m-0 md:space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Add Class
            </h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Title</span>
              </label>
              <input
                type="text"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm md:text-base">Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  {...register("name", { required: "name is required" })}
                  readOnly
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm md:text-base">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  value={user?.email}
                  readOnly
                  className="input input-bordered"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Price</span>
              </label>
              <input
                type="number"
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
                  Profile Image
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
      </div>
    </div>
  );
};

export default AddClass;
