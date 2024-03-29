import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// base api
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: () => ({}),
});
