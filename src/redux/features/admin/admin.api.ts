import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

export interface IAdminSummary {
  totalUsers: number;
  totalAgents: number;
  totalAdmins: number;
  totalTransactions: number;
  totalTransactionVolume: number;
  todayTransactions: number;
  todayTransactionVolume: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface IAdminActivity {
  _id: string;
  type: string;
  amount: number;
  userPhone: string;
  timestamp: Date;
  status: string;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSummary: builder.query<IResponse<IAdminSummary>, void>({
      query: () => ({ url: "/admin/summary", method: "GET" }),
      providesTags: ["ADMIN_SUMMARY"],
    }),

    getAdminActivity: builder.query<
      IResponse<IAdminActivity[]>,
      { limit?: number }
    >({
      query: ({ limit = 10 } = {}) => ({
        url: "/admin/activity",
        method: "GET",
        params: { limit },
      }),
      providesTags: ["ADMIN_ACTIVITY"],
    }),

    // Get all users
    getAllUsers: builder.query<IResponse<IUser[]>, void>({
      query: () => ({ url: "/admin/users", method: "GET" }),
      providesTags: ["USERS"],
    }),
    // Update user status (block/unblock)
    updateUserStatus: builder.mutation<
      IResponse<IUser>,
      { userId: string; isActive: boolean }
    >({
      query: ({ userId, ...payload }) => ({
        url: `/admin/users/${userId}/status`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USERS"],
    }),
  }),
});

// ✅ CRITICAL: Export the hooks
export const {
  useGetAdminSummaryQuery,
  useGetAdminActivityQuery,
  useGetAllUsersQuery, // Add this
  useUpdateUserStatusMutation, // Add this
} = adminApi;
