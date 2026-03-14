import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { login as loginApi } from "../api";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginSchema } from "../validation/loginSchema";
import * as yup from "yup";
import { useAuth } from "../hooks/useApi";
import { AxiosError } from "axios";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState("");

  const loginMutate = useAuth();
  const { isPending } = loginMutate;

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setError("");
    loginMutate.mutate(data, {
      onSuccess: (response) => {
        login(response.data.token, response.data.user);
        navigate("/pos");
      },
      onError: (err: any) => {
        const response = err.response.data;
        setError(response.message || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-10">
          {/* <div className="w-35 h-35 bg-primary-purple rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-6">
            KasirIn
          </div> */}
          <div className="flex justify-center">
            <div className="text-3xl w-fit font-bold text-white p-3 rounded bg-primary-purple mb-6">
              Kasir
              <span className="ms-1 px-1 bg-white text-primary-purple">In</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to continue to Dessert POS</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                {...register("username")}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none transition-all"
                placeholder="ROOT"
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-sm text-red-500">
                {errors.username.message as string}
              </p>
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
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-bold text-white bg-primary-purple hover:bg-primary-purple/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple transition-all disabled:opacity-50 ${isPending && "animate-pulse"}`}
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary-purple font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
