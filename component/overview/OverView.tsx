"use client";

import { useState } from "react";
import { CategoryStatsCard } from "./CategoryStatesCard";
import { PlatformStatsCard } from "./PlatformStatesCard";
import { UserActivitiesCard } from "./UserActivityCard";
import { UserTypesCard } from "./UserTypeCard";
import { TimePeriod } from "@/lib/data";
import { useOverviewQuery } from "@/services/api";

export const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Weekly");
  const { data: overviewData, isLoading } = useOverviewQuery(selectedPeriod);
  console.log("Overview Data:", selectedPeriod);
  // const data = getDataByPeriod(selectedPeriod);

  const periods: TimePeriod[] = ["Weekly", "Monthly", "Yearly"];

  return (
    <div className=" bg-gray-100 p-6 max-md:max-w-screen overflow-hidden">
      <div className="">
        {/* Header */}
        <div className="flex md:justify-end items-center mb-8">
          <div className="flex space-x-2 border-2 p-2 rounded-lg border-[#969696]">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedPeriod === period
                    ? "orange text-white"
                    : " text-gray-700 hover:bg-gray-50"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="flex flex-col gap-4">
          {/* User Types - Full width on large screens */}
          <div className="flex flex-col gap-3.5">
            <div className="lg:col-span-4">
              <UserTypesCard
                overview={overviewData?.overview || {}}
                period={selectedPeriod || ""}
                loading={isLoading}
              />
            </div>

            {/* Platform Stats */}
            <div className="">
              <PlatformStatsCard
                boostingStats={overviewData?.overview?.boosting_stats}
                searchStats={overviewData?.overview?.search_activity}
                engagementStats={overviewData?.overview?.engagement_stats}
                period={selectedPeriod || ""}
                loading={isLoading}
              />
            </div>
          </div>
          {/* Category Stats */}
          <div className="flex gap-4 flex-col md:flex-row md:items-stretch">
            <div className="lg:w-1/2 w-full bg-white rounded-md flex-1">
              <CategoryStatsCard
                active_premium_user={
                  overviewData?.overview?.premium_insights
                    .active_premium_user || 0
                }
                renewal_rate={
                  overviewData?.overview?.premium_insights.renewal_rate || 0
                }
                churn_rate={
                  overviewData?.overview?.premium_insights.churn_rate || 0
                }
              />
            </div>

            <div className="lg:w-1/2 bg-white rounded-lg w-full flex-1 overflow-hidden">
              <UserActivitiesCard
                data={overviewData?.overview?.search_frequency || []}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
