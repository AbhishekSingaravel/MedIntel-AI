import api from "@/api/axios";

import type {
  LoginFormData,
  RegisterFormData,
} from "@/validations/authTypes";

import type {
  LoginResponse,
  UserResponse,
} from "@/types/auth";

export const authService = {
  async register(
    data: RegisterFormData
  ): Promise<UserResponse> {
    const response = await api.post("/users/register", {
      name: data.fullName,
      email: data.email,
      password: data.password,
    });

    return response.data;
  },

  async login(
    data: LoginFormData
  ): Promise<LoginResponse> {
    const formData = new URLSearchParams();

    formData.append("username", data.email);
    formData.append("password", data.password);

    const response = await api.post(
      "/users/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  },
};