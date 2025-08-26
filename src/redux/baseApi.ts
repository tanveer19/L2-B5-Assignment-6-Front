import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),

  tagTypes: ["USER"],
  endpoints: () => ({}),
});

// src/redux/api/baseApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api/v1", // backend URL
//     credentials: "include", // 🔑 send cookies (important for auth/session)
//   }),
//   tagTypes: ["Wallet", "Transaction"],
//   endpoints: () => ({}),
// });
