// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getCookie, storeCookie } from "../../utils/cookie-function";
// import { logout } from "../auth/slice";
// const baseUrl  = import.meta.env.VITE_BASE_URL;
// const apiVersion  = import.meta.env.VITE_SERVER_VERSION;

export const baseQuery = fetchBaseQuery({
  baseUrl : `http://localhost:3000/`,
  prepareHeaders: (headers, { getState }) => {
    // const token = getCookie("accessToken");
    if (true) {
      headers.set("authorization", `Bearer ${`dffsfdsd`}`);
    }
    return headers;
  },
});

// export const baseQueryWithRefreshToken = fetchBaseQuery({
//     baseUrl,
//     prepareHeaders: (headers, { getState }) => {
//         const refreshToken = getCookie("refreshToken");
//       if (refreshToken) {
//         headers.set("authorization", `Bearer ${refreshToken}`);
//       }
//       return headers;
//     },
// });

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  result = await baseQuery(args, api, extraOptions);
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
    "allMealPlans"
  ],
  endpoints: (builder) => ({}),
});
