import { api } from "./axios";
import { mockCategories } from "../mock/categories";
import { mockProducts } from "../mock/products";
import { mockUser, mockToken } from "../mock/auth";
import { ApiResponse } from "../types/api";
import { AuthResponse, User } from "../types/user";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { CreateOrderRequest, Order } from "../types/order";

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export const login = async (
  credentials: Record<string, string>,
): Promise<ApiResponse<AuthResponse>> => {
  if (USE_MOCK) {
    if (credentials.username === "ROOT" && credentials.password === "UAT") {
      return {
        success: true,
        data: {
          token: mockToken,
          user: mockUser,
        },
      };
    }
    throw new Error("Invalid credentials");
  }
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    credentials,
  );
  return data;
};

export const register = async (
  userData: Record<string, string>,
): Promise<ApiResponse<User>> => {
  if (USE_MOCK) {
    return {
      success: true,
      data: {
        id: "user_" + Date.now(),
        name: userData.name,
        email: userData.email,
      },
    };
  }
  const { data } = await api.post<ApiResponse<User>>(
    "/auth/register",
    userData,
  );
  return data;
};

export const getMe = async (): Promise<ApiResponse<User>> => {
  if (USE_MOCK) {
    const token = localStorage.getItem("authToken");
    if (token === mockToken) {
      return {
        success: true,
        data: mockUser,
      };
    }
    throw new Error("Unauthorized");
  }
  const { data } = await api.get<ApiResponse<User>>("/auth/me");
  return data;
};

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  if (USE_MOCK) {
    return {
      success: true,
      data: mockCategories,
    };
  }
  const { data } = await api.get<ApiResponse<Category[]>>("/categories");
  return data;
};

export const getProducts = async (params?: {
  category_id?: string;
  search?: string;
}): Promise<ApiResponse<Product[]>> => {
  if (USE_MOCK) {
    let filtered = [...mockProducts];
    if (params?.category_id) {
      filtered = filtered.filter((p) => p.category_id === params.category_id);
    }
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchLower),
      );
    }
    return {
      success: true,
      data: filtered,
    };
  }
  const { data } = await api.get<ApiResponse<Product[]>>("/products", {
    params,
  });
  return data;
};

export const createOrder = async (
  orderData: CreateOrderRequest,
): Promise<ApiResponse<Order>> => {
  if (USE_MOCK) {
    return {
      success: true,
      data: {
        id: "ord_" + Date.now(),
        order_id: "ord_" + Date.now(),
        customer_name: orderData.customer_name,
        total: orderData.items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        ),
        created_at: new Date().toISOString(),
        items: orderData.items,
      },
    };
  }
  const { data } = await api.post<ApiResponse<Order>>("/orders", orderData);
  return data;
};

export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  if (USE_MOCK) {
    return {
      success: true,
      data: [],
    };
  }
  const { data } = await api.get<ApiResponse<Order[]>>("/orders");
  return data;
};
