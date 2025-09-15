import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OverviewResponse } from "@/interface/Overview";
import { UserActivityResponse } from "@/interface/UserActivity";
import { ManageUsersResponse } from "@/interface/ManageUser";
import {
  AnalyticsRevenueStatsResponse,
  AnalyticsUserStatusDistribution,
  ReturningUsersResponse,
  RevenueGrowthDataResponse,
} from "@/interface/Analytics";
import { BoosterRecordResponse } from "@/interface/BoosterRecord";
const baseURL = "https://ppp7rljm-8000.inc1.devtunnels.ms/admin-api/";

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
  type?: string;
}
interface ManageUserProps {
  limit: number;
  page: number;
  search?: string;
  subscription?: string;
  banned?: boolean;
}
interface ReturningUsersProps {
  period: string;
}
interface RevenuProps {
  period: string;
}
interface RevenueGrowthProps {
  year: string;
}
interface BoosterRecordProps {
  limit: number;
  page: number;
}
interface ActionProps {
  action: string;
}
interface BoosterPauseRes {
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
      query: ({ limit, page, search, type }) =>
        `user-activity/?limit=${limit}&page=${page}${
          search ? `&search=${search}` : ""
        }${type ? `&type=${type}` : ""}`,
      providesTags: ["User"],
    }),
    deleteConten: builder.mutation({
      query: (id: number) => ({
        url: `user-activity/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    manageUser: builder.query<ManageUsersResponse, ManageUserProps>({
      query: ({ limit, page, search, banned, subscription }) => ({
        url: `manage-users/?limit=${limit}&page=${page}${
          search ? `&search=${search}` : ``
        }${banned ? `&banned=${banned}` : ``}${
          subscription ? `&subscription=${subscription}` : ``
        }`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `manage-users/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, duration }: { id: number; duration: string }) => ({
        url: `manage-users/${id}/subscription/`,
        method: "PATCH",
        body: { duration },
      }),
      invalidatesTags: ["User"],
    }),
    banUser: builder.mutation({
      query: ({ id, duration }: { id: number; duration: string }) => ({
        url: `manage-users/${id}/ban/`,
        method: "PATCH",
        body: { duration },
      }),
      invalidatesTags: ["User"],
    }),
    unbanUser: builder.mutation({
      query: (id: number) => ({
        url: `manage-users/${id}/unban/`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    analyticsReturningUsers: builder.query<
      ReturningUsersResponse,
      ReturningUsersProps
    >({
      query: ({ period }: ReturningUsersProps) => ({
        url: `returning-users/?period=${period}`,
        method: "GET",
      }),
    }),
    analyticsUserStatusDistribution: builder.query<
      AnalyticsUserStatusDistribution,
      void
    >({
      query: () => ({
        url: `user-status-distribution/`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    analyticsRevenueLeaderBoard: builder.query<
      AnalyticsRevenueStatsResponse,
      RevenuProps
    >({
      query: ({ period }: RevenuProps) => ({
        url: `revenue-leaderboard/?period=${period}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    analyticsRevenueGrowthData: builder.query<
      RevenueGrowthDataResponse,
      RevenueGrowthProps
    >({
      query: ({ year }: RevenueGrowthProps) => ({
        url: `revenue-growth/?year=${year}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    boosterRecord: builder.query<BoosterRecordResponse, BoosterRecordProps>({
      query: ({ limit, page }: BoosterRecordProps) => ({
        url: `payment-records/?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    boosterPause: builder.mutation<
      BoosterPauseRes,
     ActionProps & { id: number }
    >({
      query: ({ id, action }) => ({
        url: `payment-records/${id}/toggle/`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["User"],
    }),
    boosterDelete: builder.mutation({
      query: (id: number) => ({
        url: `payment-records/${id}/`,
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
  useManageUserQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useBanUserMutation,
  useUnbanUserMutation,
  useAnalyticsReturningUsersQuery,
  useAnalyticsUserStatusDistributionQuery,
  useAnalyticsRevenueLeaderBoardQuery,
  useAnalyticsRevenueGrowthDataQuery,
  useBoosterPauseMutation,
  useBoosterDeleteMutation,
  useBoosterRecordQuery,
} = api;
