"use client";
import { useAnalyticsQuery } from "@/services/api";
import { BarChartReturn } from "./BarChartReturn";
import { BarChartRevenue } from "./BarChartRevenue";
import { PieChartStatus } from "./PieChartStatus";
import { RevenueLeaderBoard } from "./RevenueLeaderBoard";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export const Analytics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const { data, error, isLoading } = useAnalyticsQuery({
    period: range,
    leaderboard_count: 5,
    start_date: dateRange?.from
      ? format(dateRange.from, "yyyy-MM-dd")
      : undefined,
    end_date: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
  });

  return (
    <div className="flex flex-col gap-4 w-full my-4 md:my-6 lg:my-8 px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="w-full bg-white rounded-lg">
          <BarChartReturn
            range={range}
            setRange={setRange}
            returningUsers={
              data?.returning_users || { weekly: [], monthly: [], yearly: [] }
            }
          />
        </div>
        <div className="w-full bg-white rounded-lg">
          <PieChartStatus
            total={data?.user_status_distribution.total || 0}
            free_percentage={
              data?.user_status_distribution.free_percentage || 0
            }
            premium_percentage={
              data?.user_status_distribution.premium_percentage || 0
            }
            free_count={data?.user_status_distribution.free_count || 0}
            premium_count={data?.user_status_distribution.premium_count || 0}
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
