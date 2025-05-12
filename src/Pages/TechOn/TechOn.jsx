import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import teachingLottie from "./LottieFiles/teacher.json";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useContexHooks from "../../useHooks/useContexHooks";
import imageUpload from "../../useHooks/imageUpload";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import PreLoader from "../../components/PreLoader";
import useAdmin from "../../privateRouts/useAdmin";

const TeachOn = () => {
  const { user, togol } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  const {
    data: isTeacher,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/teacherReq/${user?.email}`);
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
    },
  });
  console.log(isTeacher);

  const createPost = async (newpost) => {
    const response = await axiosSecure.post("/teacher", newpost);
    return response.data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Define the mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Your application has been submitted successfully!", {
        position: "top-center",
      });
      reset();
      refetch();
    },
    onError: (error) => {
      toast.error(`Submission failed: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  // Form submission handler
  const onSubmit = async (data) => {
    const { image, ...formData } = data;

    try {
      const imgUrl = await imageUpload(image[0]);
      formData.image = imgUrl;
    } catch (err) {
      console.error("Image upload failed:", err.message);
      toast.error("Image upload failed. Please try again.", {
        position: "top-center",
      });
      return;
    }

    formData.status = "pending";
    formData.email = user.email;

    console.log("Final Payload:", formData);

    try {
      mutation.mutateAsync(formData);
    } catch (err) {
      console.error("Submission failed:", err.message);
    }
  };

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return (
      <p className="text-2xl text-red-500">
        {error || "An unknown error occurred."}
      </p>
    );
  }

  return (
    <div
      className={`${
        togol ? "bg-base-200" : "bg-[#111827]"
      } min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8`}
    >
      <Helmet>
        <title>SmartLearning | Teach on</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-5xl">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="py-6 w-full max-w-md">
            <Lottie animationData={teachingLottie} />
          </div>
        </div>
        <div className="card bg-base-100 w-full lg:w-1/2 shadow-2xl p-6 rounded-lg">
          <form
            className="card-body space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Apply for Teaching Position
            </h1>

            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Profile Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">
                  Add Image
                </span>
              </label>
              <div className="input-group">
                <input
                  type="file"
                  {...register("image", { required: "Image is required" })}
                  className="file-input file-input-bordered w-full"
                />
                <span className="input-group-icon">
                  <FaCloudUploadAlt size={20} className="text-gray-500" />
                </span>
              </div>
              {errors.image && (
                <span className="text-red-500 text-sm">
                  {errors.image.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input input-bordered"
                readOnly
                value={user.email}
              />
            </div>

            {/* Experience Level */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">
                  Experience Level
                </span>
              </label>
              <select
                {...register("experience", {
                  required: "Experience is required",
                })}
                className="select select-bordered"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner</option>
                <option value="mid-level">Mid-Level</option>
                <option value="experienced">Experienced</option>
              </select>
              {errors.experience && (
                <span className="text-red-500 text-sm">
                  {errors.experience.message}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Title</span>
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter title"
                className="input input-bordered"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">
                  Category
                </span>
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="select select-bordered"
              >
                <option value="">Select a category</option>
                <option value="web-development">Web Development</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="data-science">Data Science</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="content-writing">Content Writing</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={
                  mutation.isLoading ||
                  isTeacher === "pending" ||
                  isTeacher === "approved" ||
                  isAdmin
                } // Disable the button while loading
              >
                {/* ? "Wait for the review":isTeacher === 'teacher'?"You are now Teacher":isTeacher === false? */}
                {isTeacher === "pending"
                  ? "Wait For the Reviwe"
                  : isTeacher === "approved"
                  ? "You are now Teacher"
                  : isTeacher === "reject"
                  ? "Submit for another"
                  : mutation.isLoading
                  ? "Submitting..."
                  : "Submit for review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeachOn;
