import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "USER",
    "USERS",
    "WALLET",
    "AGENT",
    "AGENT_SUMMARY",
    "AGENT_TRANSACTIONS",
    "AGENT_ACTIVITY",
    "TRANSACTION",
    "ADMIN_SUMMARY",
    "ADMIN_ACTIVITY",
  ],
  endpoints: () => ({}),
});
