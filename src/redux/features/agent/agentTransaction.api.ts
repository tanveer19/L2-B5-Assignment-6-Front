import { baseApi } from "@/redux/baseApi";

export const agentTransactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cashIn: build.mutation({
      query: (body) => ({
        url: "/agent/transactions/cashIn",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AGENT", "TRANSACTION"],
    }),
    cashOut: build.mutation({
      query: (body) => ({
        url: "/agent/transactions/cashOut",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AGENT", "TRANSACTION"],
    }),
  }),
});

export const { useCashInMutation, useCashOutMutation } = agentTransactionApi;
