import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IWallet, ITransaction, IUserProfile } from "./user.types";

export const userApi = baseApi.injectEndpoints({
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

    // send money
    sendMoney: builder.mutation<
      IResponse<ITransaction>,
      { to: string; amount: number; narrative?: string }
    >({
      query: (payload) => ({
        url: "/wallet/send",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET"],
    }),

    // deposit (agent simulation) - in real app agents do cash in; frontend calls endpoint to simulate
    deposit: builder.mutation<
      IResponse<ITransaction>,
      { cardNumber: string; amount: number; note?: string }
    >({
      query: (payload) => ({
        url: "/wallet/deposit",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET"],
    }),

    // withdraw
    withdraw: builder.mutation<
      IResponse<ITransaction>,
      { amount: number; method?: string }
    >({
      query: (payload) => ({
        url: "/wallet/withdraw",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET"],
    }),

    // user profile
    getProfile: builder.query<IResponse<IUserProfile>, void>({
      query: () => ({ url: "/user/me", method: "GET" }),
      providesTags: ["USER"],
    }),

    updateProfile: builder.mutation<
      IResponse<IUserProfile>,
      Partial<IUserProfile> & { password?: string }
    >({
      query: (payload) => ({
        url: "/user/update",
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetRecentTransactionsQuery,
  useGetTransactionsQuery,
  useSendMoneyMutation,
  useDepositMutation,
  useWithdrawMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = userApi;
