import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

export interface IRegisterUser {
  name: string;
  email?: string;
  password: string;
  phone: string;
  role?: "USER" | "AGENT" | "ADMIN";
  address?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse, IRegisterUser>({
      query: (userInfo) => ({
        url: "/user/register", // match backend endpoint
        method: "POST",
        data: userInfo, // axiosBaseQuery expects `data`
      }),
    }),
    login: builder.mutation<IResponse, { email: string; password: string }>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    userInfo: builder.query<IResponse, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
