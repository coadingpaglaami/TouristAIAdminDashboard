import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OverviewResponse } from "@/interface/Overview";
const baseURL = "https://ppp7rljm-8000.inc1.devtunnels.ms/admin-api/";


interface LogOutRequest {
  refresh: string;
}
interface LogOutResponse {
  message: string;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");

    // ✅ Get token from cookies
    if (typeof window !== "undefined") {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }

    return headers;
  },
  credentials: "include",
  validateStatus: (response, body) => {
    console.log("API Response Status:", response.status);
    console.log("API Response Body:", body);
      return response.status >= 200 && response.status < 300;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (logindata) => ({
        url: "login/",
        method: "POST",
        body: logindata,
      }),
    }),
    logout: builder.mutation<LogOutResponse, LogOutRequest>({
      query: (logOutData) => ({
        url: "logout/",
        method: "POST",
        body: logOutData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "forgot-password/",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: "verify-otp/",
        method: "POST",
        body: otp,
      }),
    }),
    adminLoginVerify: builder.mutation({
      query: (data) => ({
        url: "login/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),
    overview: builder.query<OverviewResponse, string>({
      query: (period = "Weekly") => `overview/?period=${period}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useOverviewQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useAdminLoginVerifyMutation,
} = api;
