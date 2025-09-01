// src/redux/features/admin/admin.api.ts
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

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

    // Add other admin endpoints as needed
  }),
});

// ✅ CRITICAL: Export the hooks
export const { useGetAdminSummaryQuery, useGetAdminActivityQuery } = adminApi;
