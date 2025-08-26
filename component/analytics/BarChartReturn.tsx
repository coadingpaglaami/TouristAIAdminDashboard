"use client";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartDataMonth = [
  { week: "Week 1", returningUser: 186 },
  { week: "Week 2", returningUser: 305 },
  { week: "Week 3", returningUser: 237 },
  { week: "Week 4", returningUser: 73 },
];

const chartDataWeek = [
  { day: "Mon", returningUser: 32 },
  { day: "Tue", returningUser: 45 },
  { day: "Wed", returningUser: 51 },
  { day: "Thu", returningUser: 38 },
  { day: "Fri", returningUser: 60 },
  { day: "Sat", returningUser: 49 },
  { day: "Sun", returningUser: 41 },
];

const chartDataYear = [
  { month: "Jan", returningUser: 210 },
  { month: "Feb", returningUser: 180 },
  { month: "Mar", returningUser: 250 },
  { month: "Apr", returningUser: 220 },
  { month: "May", returningUser: 270 },
  { month: "Jun", returningUser: 230 },
  { month: "Jul", returningUser: 260 },
  { month: "Aug", returningUser: 240 },
  { month: "Sep", returningUser: 200 },
  { month: "Oct", returningUser: 215 },
  { month: "Nov", returningUser: 225 },
  { month: "Dec", returningUser: 195 },
];

const chartConfig = {
  returningUser: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// State for switching chart data
type ChartRange = "week" | "month" | "year";

const chartDataMap = {
  week: chartDataWeek,
  month: chartDataMonth,
  year: chartDataYear,
};

const xAxisKeyMap: Record<ChartRange, string> = {
  week: "day",
  month: "week",
  year: "month",
};

export const BarChartReturn = () => {
  const [range, setRange] = useState<ChartRange>("year");
  const chartData = chartDataMap[range];
  const xAxisKey = xAxisKeyMap[range];

  return (
    <div className="lg:max-h-[35vh]">
      <Card className="border-none rounded-lg ">
        <CardHeader>
          <CardTitle className="tracking-wider text-lg">
            Returning Users
          </CardTitle>
          <CardTitle className="flex justify-end">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRange("week")}
                className={`p-2 text-sm rounded-full tracking-wider font-light ${
                  range === "week"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setRange("month")}
                className={`p-2 text-sm rounded-full tracking-wider font-light ${
                  range === "month"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRange("year")}
                className={`p-2 text-sm rounded-full tracking-wider font-light ${
                  range === "year"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Yearly
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="max-h-[26vh] min-w-full" config={chartConfig}>
              <BarChart className="" accessibilityLayer data={chartData} >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar className="h-36" dataKey="returningUser" fill="#FF7A00" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
