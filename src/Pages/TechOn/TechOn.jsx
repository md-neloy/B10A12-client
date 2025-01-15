import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import teachingLottie from "./LottieFiles/teacher.json";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useContexHooks from "../../useHooks/useContexHooks";
import imageUpload from "../../useHooks/imageUpload";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Function to create a post (POST request via Axios)
const createPost = async (newpost) => {
  const response = await axios.post("http://localhost:5050/teacher", newpost);
  return response.data;
};

const TeachOn = () => {
  const { user } = useContexHooks(); // Custom hook to get the current user
  const queryClient = useQueryClient(); // To manage query cache and invalidation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Define the mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch any relevant queries
      queryClient.invalidateQueries(["teacherPosts"]);
      toast.success("Your application has been submitted successfully!", {
        position: "top-center",
      });
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

    // Step 1: Upload Image
    try {
      const imgUrl = await imageUpload(image[0]); // Custom hook for image upload
      formData.image = imgUrl; // Add image URL to the form data
    } catch (err) {
      console.error("Image upload failed:", err.message);
      toast.error("Image upload failed. Please try again.", {
        position: "top-center",
      });
      return;
    }

    // Step 2: Add Additional Fields
    formData.status = "pending";
    formData.email = user.email; // Attach the user's email

    console.log("Final Payload:", formData);

    // Step 3: Submit Post via Mutation
    try {
      mutation.mutateAsync(formData); // Use mutateAsync for async actions
    } catch (err) {
      console.error("Submission failed:", err.message);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Apply for Teaching | Education Platform</title>
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
                  Profile Image
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
                disabled={mutation.isLoading} // Disable the button while loading
              >
                {mutation.isLoading ? "Submitting..." : "Submit for Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeachOn;
