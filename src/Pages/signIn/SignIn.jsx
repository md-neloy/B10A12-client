import Lottie from "lottie-react";
import signin from "./signin.json";
import { FaEye, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useContexHooks from "../../useHooks/useContexHooks";
import { useState } from "react";
import { PiEyeClosedFill } from "react-icons/pi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../useHooks/useAxiosPublic";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const [passTogol, setPassTogol] = useState(true);
  const { loginUser, googleLogin } = useContexHooks();

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

  const successNofity = () => {
    toast.success("Successfully Login!", {
      position: "top-center",
    });
  };

  const errorNofity = (error = "password or email is not valid") => {
    toast.error(error, {
      position: "top-left",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then((result) => {
        if (result.user) {
          successNofity();
          if (location.state) {
            navigate(location.state);
          } else {
            navigate("/");
          }
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
          role: "student",
        };
        mutation.mutateAsync(userInfo);
        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
        successNofity();
      })
      .catch((error) => {
        errorNofity(error.message);
      });
  };

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Marathon-GuidLine | SignIn</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row-reverse items-center w-full max-w-4xl">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="py-6 w-full max-w-md">
            <Lottie animationData={signin} />
          </div>
        </div>
        <div className="card bg-base-100 w-full lg:w-1/2 shadow-2xl p-6 rounded-lg">
          <form
            className="card-body space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Sign-In
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm md:text-base">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={passTogol ? "password" : "text"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                  onClick={() => {
                    setPassTogol(!passTogol);
                  }}
                >
                  {passTogol ? <PiEyeClosedFill /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Sign In
              </button>
            </div>
          </form>
          <div className="divider text-gray-500">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 transition-colors"
          >
            <FaGoogle size={20} />
            Login with Google
          </button>
          <p className="mt-4 text-center text-sm md:text-base text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
