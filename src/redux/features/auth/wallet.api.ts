import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch logged-in user's wallet
    getMyWallet: builder.query({
      query: () => ({
        url: "/wallet/my",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    // Fetch transactions
    getTransactions: builder.query({
      query: (params) => ({
        url: "/wallet/transactions",
        method: "GET",
        params, // supports pagination, filters
      }),
      providesTags: ["TRANSACTION"],
    }),

    // Deposit money
    addMoney: builder.mutation({
      query: (body) => ({
        url: "/wallet/add-money",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),

    // Withdraw money
    withdrawMoney: builder.mutation({
      query: (body) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),

    // Send money to another user
    sendMoney: builder.mutation({
      query: (body) => ({
        url: "/wallet/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
  }),
});

export const {
  useGetMyWalletQuery,
  useGetTransactionsQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
} = walletApi;
