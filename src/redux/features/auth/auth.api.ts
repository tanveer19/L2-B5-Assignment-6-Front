import { baseApi } from "@/redux/baseApi";
import type { IResponse, TRole } from "@/types";

export interface IRegisterUser {
  name: string;
  email?: string;
  password: string;
  phone: string;
  role: "USER" | "AGENT";
  address?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse, IRegisterUser>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation<IResponse, { phone: string; password: string }>({
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
    // auth.api.ts
    // auth.api.ts
    userInfo: builder.query<
      IResponse<{ role: TRole; phone: string; name: string }>,
      void
    >({
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
