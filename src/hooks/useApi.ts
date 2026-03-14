import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getProducts,
  createOrder,
  getOrders,
  login,
  register,
} from "../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginSchema } from "../validation/loginSchema";
import * as yup from "yup";
import { AxiosError } from "axios";
import { User } from "../types/user";
import { RegisterFormData } from "../validation/registerSchema";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (response) => response.data,
  });
};

export const useProducts = (params?: {
  category_id?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    select: (response) => response.data,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    select: (response) => response.data,
  });
};

export const useAuth = () => {
  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const data = await login(credentials);
      return data;
    },
    onError: (err: AxiosError) => {
      return err.response?.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (newUser: RegisterFormData) => {
      const data = await register(newUser);
      return data;
    },
  });
};
