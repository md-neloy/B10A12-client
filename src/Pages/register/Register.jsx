import Lottie from "lottie-react";
import registerLottie from "../register/register.json";
import { FaEye, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useContexHooks from "../../useHooks/useContexHooks";
import { useState } from "react";
import { PiEyeClosedFill } from "react-icons/pi";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();
  const [passTogol, setPassTogol] = useState(true);
  const queryClient = useQueryClient();
  const { createUser, googleLogin, updateUserProfile, setUser } =
    useContexHooks();
  const axiosPublic = useAxiosPublic();
  const createPost = async (newpost) => {
    const response = await axiosPublic.post("/users", newpost);
    return response.data;
  };

  // Define the mutation
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const successNofity = () => {
    toast.success("Successfully Created Account!", {
      position: "top-center",
    });
  };

  const errorNofity = (text = "Error Notification") => {
    toast.error(text, {
      position: "top-left",
    });
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const onSubmit = (data) => {
    const { name, imgUrl, email, password } = data;

    if (!passwordRegex.test(password)) {
      errorNofity(
        "Your password is not valid. It must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        if (result.user) {
          setUser(result.user);
          const userInfo = {
            name: name,
            email: email,
            image: imgUrl,
            role: "student",
          };
          mutation.mutateAsync(userInfo);
          updateUserProfile(name, imgUrl).then(() => {
            successNofity();
            navigate("/");
            reset();
            setUser((prev) => ({
              ...prev,
              displayName: name,
              photoURL: imgUrl,
            }));
          });
        }
      })
      .catch((err) => errorNofity(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "student",
        };
        mutation.mutateAsync(userInfo);
        navigate("/");
        toast.success("Successfully logged in with Google!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-left",
        });
      });
  };

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>SmartLearning | Register</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-4xl">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="py-6 w-full max-w-md">
            <Lottie animationData={registerLottie} />
          </div>
        </div>
        <div className="card bg-base-100 w-full lg:w-1/2 shadow-2xl p-6 rounded-lg">
          <form
            className="card-body space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Register Now!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm md:text-base">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm md:text-base">
                    Photo URL
                  </span>
                </label>
                <input
                  type="url"
                  {...register("imgUrl", { required: "Photo URL is required" })}
                  placeholder="Enter your Photo Url"
                  className="input input-bordered"
                />
                {errors.imgUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.imgUrl.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm md:text-base">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm md:text-base">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={passTogol ? "password" : "text"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                    onClick={() => {
                      setPassTogol(!passTogol);
                    }}
                  >
                    {passTogol ? <PiEyeClosedFill /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Register
              </button>
            </div>
          </form>
          <div className="divider text-gray-500">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors"
          >
            <FaGoogle size={20} />
            LogIn with Google
          </button>
          <p className="mt-4 text-center text-sm md:text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
