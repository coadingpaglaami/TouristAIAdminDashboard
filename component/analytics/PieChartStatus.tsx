// "use client";
// import { TrendingUp } from "lucide-react";
// import {
//   Label,
//   PolarGrid,
//   PolarRadiusAxis,
//   RadialBar,
//   RadialBarChart,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// export const description = "A donut chart";
// // Removed duplicate chartData declaration for visitors by browser
// const rawData = [
//   { type: "free", user: 130, fill: "#D9D9D9" },
//   { type: "booster", user: 70, fill: "#FF7A00" },
// ];

// const totalUsers = rawData.reduce((sum, item) => sum + item.user, 0);

// const chartData = rawData.map((item) => ({
//   ...item,
//   percentage: totalUsers ? Math.round((item.user / totalUsers) * 100) : 0,
// }));

// const chartConfig = {
//   free: {
//     label: "Free User",
//     color: "#D9D9D9",
//   },
//   booster: {
//     label: "Booster User",
//     color: "#FF7A00",
//   },
//   user: {
//     label: "User",
//   },
// } satisfies ChartConfig;
"use client";

import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const description = (
  <div className="flex flex-col gap-2 ">
    <p className="tracking-wider text-[#1C1B1F]">Total User 12,478</p>
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

        <span>Free User {"(30%)"}</span>
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

        <span>Booster User {"(70%)"}</span>
      </div>
    </div>
  </div>
);
const chartData = [{ visitors: 150, fill: "var(--color-safari)" }];
const chartConfig = {
  visitors: {
    label: "Free",
    color: "#D9D9D9",
  },
  safari: {
    label: "Booster",
    color: "#FF7A00",
  },
} satisfies ChartConfig;

export const PieChartStatus = () => {
  return (
    <div>
      <Card className="flex flex-col ">
        <CardHeader className="">
          <CardTitle className="tracking-wider text-lg font-medium text-[#1C1B1F]">
            User Status Distribution
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className=" pb-0 ">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[400px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={260}
              innerRadius={80}
              outerRadius={170}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[100, 65]}
              />
              <RadialBar dataKey="visitors" background cornerRadius={20} />
              <PolarRadiusAxis
                tick={false}
                tickLine={false}
                axisLine={false}
              ></PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
