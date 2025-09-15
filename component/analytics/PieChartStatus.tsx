"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AnalyticsUserStatusDistribution } from "@/interface/Analytics";

const description = (
  free_percentage: number,
  premium_percentage: number,
  total: number
) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="tracking-wider text-[#1C1B1F]">Total User {total}</p>
      <div className="flex items-center gap-4 text-black tracking-wider">
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#D9D9D9" />
          </svg>

          <span>Free User {free_percentage} %</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#FF7A00" />
          </svg>

          <span>Booster User {premium_percentage} %</span>
        </div>
      </div>
    </div>
  );
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const PieChartStatus = ({
  total,
  free_percentage,
  premium_percentage,
  free_count,
  premium_count,
}: AnalyticsUserStatusDistribution) => {
  const chartData = [
    { browser: "Premium", visitors: premium_count, fill: "#FF7A00" },
    { browser: "Free", visitors: free_count, fill: "#D9D9D9" },
  ];
  return (
    <Card className="flex flex-col rounded-lg">
      <CardHeader className="flex flex-col py-1">
        <CardTitle className="tracking-wider text-lg font-medium text-[#1C1B1F]">
          User Status Distribution
        </CardTitle>
        <CardDescription>
          {description(free_percentage, premium_percentage, total)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square lg:max-h-[26vh] max-h-60"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};