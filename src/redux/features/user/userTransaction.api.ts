import { baseApi } from "@/redux/baseApi";

export const userTransactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deposit: build.mutation({
      query: (body) => ({
        url: "/user/transactions/deposit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    withdraw: build.mutation({
      query: (body) => ({
        url: "/user/transactions/withdraw",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    sendMoney: build.mutation({
      query: (body) => ({
        url: "/user/transactions/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
  }),
});

export const { useDepositMutation, useWithdrawMutation, useSendMoneyMutation } =
  userTransactionApi;
