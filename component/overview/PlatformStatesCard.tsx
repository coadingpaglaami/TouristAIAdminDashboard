import { Schedule } from "@/svg/Action";
import { Group } from "@/svg/OverView";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface BoostingStats {
  total_boosted_hours: number;
  boosting_engagement_rate: number;
  boosting_engagement_change: string;
  is_boosting_increase: boolean;
}
interface SearchStats {
  total_searches: number;
  search_engagement_rate: number;
  search_engagement_change: string;
  is_search_increase: boolean;
}
interface EngagementStats {
  daily_avg_active_user: number;
  engagement_rate: string;
}

interface BoostingStatesProps {
  boostingStats: BoostingStats | undefined;
  searchStats: SearchStats | undefined;
  engagementStats?: EngagementStats | undefined;
  period: string;
  loading: boolean;
}

export const PlatformStatsCard = ({
  boostingStats,
  searchStats,
  period,
  engagementStats,
  loading,
}: BoostingStatesProps) => {
  const {
    total_boosted_hours,
    boosting_engagement_rate,
    boosting_engagement_change,
    is_boosting_increase,
  } = boostingStats || {};
  const {
    total_searches,
    search_engagement_rate,
    search_engagement_change,
    is_search_increase,
  } = searchStats || {};
  const { daily_avg_active_user, engagement_rate } = engagementStats || {};
  const data = [
    {
      name: "Boosting Stats",
      totalboostsearchrate: total_boosted_hours || 0,
      nametwo: "Total Boosted Hours",
      boostsearchengagementrate: boosting_engagement_rate || 0,
      engrate: "Boosting Engagement Rate",
      boostsearchengagementchange: boosting_engagement_change || "",
      isboostsearchincrease: is_boosting_increase || false,
      icon: (
        <span className="orange p-2">
          <Schedule />
        </span>
      ),
    },
    {
      name: "Searching Stats",
      totalboostsearchrate: total_searches || 0,
      nametwo: "Total Searches",
      boostsearchengagementrate: search_engagement_rate || 0,
      engrate: "Searching Engagement Rate",
      boostsearchengagementchange: search_engagement_change || "",
      isboostsearchincrease: is_search_increase || false,
      icon: <Group />,
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-4 max-md:max-w-[90vw] tracking-wider">
      <div className="flex flex-col p-3 border rounded-lg bg-white gap-3">
        <span className="text-xl font-semibold tracking-wider text-[#1C1B1F]">
          Daily Avg Active Users
        </span>

        <div className="flex flex-col gap-2 w-full">
          <span className="flex items-center gap-2.5 text-2xl font-semibold text-[#1C1B1F]">
            {/* <Group /> {daily_avg_active_user || 0} */}
            {loading ? <Skeleton className="w-20 h-8" /> : <Group />}
            {loading ? <Skeleton className="w-20" /> : daily_avg_active_user}
          </span>
          <div className="flex justify-between p-1">
            <span>Engagement Rate</span>
            <div className="text-sm text-gray-600">
              {loading ? (
                <Skeleton className="w-8 h-6" />
              ) : engagement_rate !== undefined ? (
                `${Math.min(Number(engagement_rate), 100)} %`
              ) : (
                "0 %"
              )}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${
                  loading
                    ? 0
                    : engagement_rate !== undefined
                    ? Math.min(Number(engagement_rate), 100)
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>
      {data.map((item, index) => (
        <div key={index} className="bg-white p-3 border rounded-lg">
          <span className="text-lg tracking-wider font-medium">
            {item.name}
          </span>
          <div className="flex items-center gap-4 mb-4">
            {loading ? <Skeleton className="w-9 h-9" /> : item.icon}

            <span className="flex items-center gap-2">
              <span className="text-xs text-green-500 flex flex-row gap-2">
                {loading ? (
                  <Skeleton className="w-6" />
                ) : (
                  item.boostsearchengagementchange
                )}{" "}
                <span className="text-gray-300">
                  from last{" "}
                  {period === "Weekly"
                    ? "week"
                    : period === "Monthly"
                    ? "month"
                    : "year"}
                </span>
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="text-sm">{item.nametwo}</span>
              <span className="text-sm">
                {loading ? (
                  <Skeleton className="w-8 h-6" />
                ) : (
                  item.totalboostsearchrate
                )}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{item.engrate}</span>
              <span className="text-sm">
                {loading ? (
                  <Skeleton className="w-8 h-6" />
                ) : (
                  item.boostsearchengagementrate +  "%"
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
