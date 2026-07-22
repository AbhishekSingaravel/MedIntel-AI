import api from "@/api/axios";

import type { UserResponse } from "@/types/auth";

export const userService = {
  async getCurrentUser(): Promise<UserResponse> {
    const response = await api.get("/users/me");

    return response.data;
  },
};