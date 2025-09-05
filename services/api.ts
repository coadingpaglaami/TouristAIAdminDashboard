import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://ppp7rljm-8000.inc1.devtunnels.ms/admin-api/";

interface User {
  id: number;
  email: string;
  username: string;
  role: string; // could be a union type if you have fixed roles like 'admin' | 'user' | 'editor'
  is_staff: boolean;
}

interface loginResponse {
  access: string;
  refresh: string;
  user: User;
}

interface loginRequest {
  email: string;
  password: string;
}

interface OverviewResponse {
  greeting: string;
  total_users: number;
  new_users: {
    weekly: number;
  };
  premium_users: number;
  inactive_users: number;
  daily_avg_active_user: number;
  boosting_stats: {
    total_boosted_hours: number;
    boosting_engagement_rate: number;
  };
  search_activity: {
    total_searches: number;
    weekly: number;
    search_engagement_rate: number;
  };
  premium_insights: {
    active_premium_user: number;
    renewal_rate: number;
    churn_rate: number;
    search_frequency: {
      name: string;
      status: string;
      search_history: number;
    }[];
  };
}
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
    login: builder.mutation<loginResponse, loginRequest>({
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
    overview: builder.query<OverviewResponse, void>({
      query: () => "overview/",
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
