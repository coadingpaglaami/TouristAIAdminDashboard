"use client";

import { useState } from "react";
import { CategoryStatsCard } from "./CategoryStatesCard";
import { PlatformStatsCard } from "./PlatformStatesCard";
import { UserActivitiesCard } from "./UserActivityCard";
import { UserTypesCard } from "./UserTypeCard";
import { getDataByPeriod, TimePeriod } from "@/lib/data";

export const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Weekly");
  const data = getDataByPeriod(selectedPeriod);

  const periods: TimePeriod[] = ["Weekly", "Monthly", "Yearly"];

  return (
    <div className=" bg-gray-100 p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-end items-center mb-8">
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
              <UserTypesCard data={data.userTypes} />
            </div>

            {/* Platform Stats */}
            <div className="">
              <PlatformStatsCard data={data.platformStats} />
            </div>
          </div>
          {/* Category Stats */}
          <div className="flex gap-2 flex-col md:flex-row md:h-[420px]">
            <div className="lg:w-1/2 h-full">
              <CategoryStatsCard data={data.categoryStats} />
            </div>

            {/* User Activities - Full width */}
            <div className="lg:col-span-2 lg:w-1/2 h-full">
              <UserActivitiesCard data={data.userActivities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
