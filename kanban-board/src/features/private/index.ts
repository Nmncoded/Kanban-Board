// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl  = process.env.BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

export const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: [
    "boardData"
  ],
  endpoints: (builder) => ({}),
});
