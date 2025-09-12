import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OverviewResponse } from "@/interface/Overview";
import { UserActivityResponse } from "@/interface/UserActivity";
const baseURL = "https://tourapi.dailo.app/admin-api/";

interface LogOutRequest {
  refresh: string;
}
interface LogOutResponse {
  message: string;
}

interface ActivityProps {
  limit: number;
  page: number;
  search?: string;
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
  tagTypes: ["User"],
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
      invalidatesTags: ["User"],
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
      query: (period: string) => `overview/?period=${period}`,
      providesTags: ["User"],
    }),
    userActivity: builder.query<UserActivityResponse, ActivityProps>({
      query: ({ limit, page, search }) =>
        `user-activity/?limit=${limit}&page=${page}${
          search ? `&search=${search}` : ""
        }`,
      providesTags: ["User"],
    }),
    deleteConten: builder.mutation({
      query: (id: number) => ({
        url: `user-activity/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
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
  useUserActivityQuery,
  useDeleteContenMutation,
} = api;
