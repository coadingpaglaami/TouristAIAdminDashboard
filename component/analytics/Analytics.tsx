"use client";
import {  useAnalyticsReturningUsersQuery, useAnalyticsUserStatusDistributionQuery } from "@/services/api";
import { BarChartReturn } from "./BarChartReturn";
import { BarChartRevenue } from "./BarChartRevenue";
import { PieChartStatus } from "./PieChartStatus";
import { RevenueLeaderBoard } from "./RevenueLeaderBoard";
import { useState } from "react";

export const Analytics = () => {
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const { data,  } = useAnalyticsReturningUsersQuery({
    period: range,
   
  });
  const { data: userStatusData } = useAnalyticsUserStatusDistributionQuery();

  return (
    <div className="flex flex-col gap-4 w-full my-4 md:my-6 lg:my-8 px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="w-full bg-white rounded-lg">
          <BarChartReturn
            range={range}
            setRange={setRange}
            returningUsers={data || { weekly: [], monthly: [], yearly: [] }}

          />
        </div>
        <div className="w-full bg-white rounded-lg">
          <PieChartStatus
            total={userStatusData?.total || 0}
            free_percentage={userStatusData?.free_percentage || 0}
            premium_percentage={userStatusData?.premium_percentage || 0}
            free_count={userStatusData?.free_count || 0}
            premium_count={userStatusData?.premium_count || 0}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="md:w-[65%] rounded-lg">
          <BarChartRevenue />
        </div>
        <div className="md:w-[35%] rounded-lg">
          <RevenueLeaderBoard />
        </div>
      </div>
    </div>
  );
};
