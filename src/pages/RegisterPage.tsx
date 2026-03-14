import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User, Mail, User2, UserCheck2, UserLock } from "lucide-react";
import { register as registerApi } from "../api";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerSchema } from "../validation/registerSchema";
import * as yup from "yup";
import { useRegister } from "../hooks/useApi";
import { AxiosError } from "axios";
import ErrorMessage from "../components/helper/ErrorMessage";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const registerMutation = useRegister();
  const { isPending } = registerMutation;

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    registerMutation.mutate(data, {
      onSuccess: () => {
        alert("Registration successful! Please login.");
        navigate("/login");
      },
      onError: (err: any) => {
        setError(err.response.data.message || "Registration failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary-purple rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-6">
            DP
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500">
            Sign up to get started with Dessert POS
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                {...register("name")}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <ErrorMessage>{errors.name.message as string}</ErrorMessage>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                {...register("email")}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <ErrorMessage>{errors.email.message as string}</ErrorMessage>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                {...register("username")}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                placeholder="johndoe"
              />
            </div>
            {errors.username && (
              <ErrorMessage>{errors.username.message as string}</ErrorMessage>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                {...register("password")}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message as string}</ErrorMessage>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-bold text-white bg-primary-purple hover:bg-primary-purple/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple transition-all disabled:opacity-50 ${isPending && "animate-pulse"}`}
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-purple font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
