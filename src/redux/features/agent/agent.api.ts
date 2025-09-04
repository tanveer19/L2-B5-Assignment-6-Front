import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type {
  IWallet,
  ITransaction,
  IAgentSummary,
  IAgentActivity,
} from "./agent.types";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<IResponse<IWallet>, void>({
      query: () => ({ url: "/wallet/my", method: "GET" }),
      providesTags: ["WALLET"],
    }),

    // recent transactions for dashboard (small list)
    getRecentTransactions: builder.query<
      IResponse<ITransaction[]>,
      { limit?: number } | void
    >({
      query: (arg) => ({
        url: "/wallet/transactions",
        method: "GET",
        params: { limit: arg?.limit ?? 5 },
      }),
      providesTags: ["WALLET"],
    }),

    // paginated transactions with filters
    getTransactions: builder.query<
      IResponse<{
        data: ITransaction[];
        meta: { total: number; page: number; limit: number };
      }>,
      {
        page?: number;
        limit?: number;
        type?: string;
        fromDate?: string;
        toDate?: string;
        search?: string;
      }
    >({
      query: ({ page = 1, limit = 10, type, fromDate, toDate, search }) => ({
        url: "/wallet/transactions",
        method: "GET",
        params: { page, limit, type, fromDate, toDate, search },
      }),
      providesTags: ["WALLET"],
    }),

    // deposit (agent simulation) - in real app agents do cash in; frontend calls endpoint to simulate
    cashin: builder.mutation<
      IResponse<ITransaction>,
      { phoneNumber: string; amount: number; note?: string }
    >({
      query: (payload) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET"],
    }),

    cashout: builder.mutation<
      IResponse<ITransaction>,
      { phoneNumber: string; amount: number; note?: string }
    >({
      query: (payload) => ({
        url: "/agent/cash-out", // Make sure this matches your backend route
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET"],
    }),
    getAgentTransactions: builder.query<
      IResponse<{
        data: ITransaction[];
        meta: { total: number; page: number; limit: number };
      }>,
      {
        page?: number;
        limit?: number;
        type?: string;
        fromDate?: string;
        toDate?: string;
        search?: string;
      }
    >({
      query: ({ page = 1, limit = 10, type, fromDate, toDate, search }) => ({
        url: "/agent/transactions",
        method: "GET",
        params: { page, limit, type, fromDate, toDate, search },
      }),
      providesTags: ["AGENT_TRANSACTIONS"],
    }),

    // ✅ ADD THIS: Agent summary
    getAgentSummary: builder.query<IResponse<IAgentSummary>, void>({
      query: () => ({ url: "/agent/summary", method: "GET" }),
      providesTags: ["AGENT_SUMMARY"],
    }),

    // ✅ ADD THIS: Agent activity
    getAgentActivity: builder.query<
      IResponse<IAgentActivity[]>,
      { limit?: number }
    >({
      query: ({ limit = 10 } = {}) => ({
        url: "/agent/activity",
        method: "GET",
        params: { limit },
      }),
      providesTags: ["AGENT_ACTIVITY"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetRecentTransactionsQuery,
  useGetTransactionsQuery,
  useCashinMutation,
  useCashoutMutation,
  useGetAgentSummaryQuery,
  useGetAgentActivityQuery,
  useGetAgentTransactionsQuery,
} = agentApi;
