"use client";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from "recharts";
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
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAnalyticsRevenueGrowthDataQuery } from "@/services/api";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const CustomChartTooltipContent = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;
  const revenue = payload[0].value;
  return (
    <div className="rounded-md bg-background p-3 shadow-md border text-sm min-w-[120px]">
      <div className="font-semibold mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Revenue:</span>
        <span className="font-bold">{revenue}$</span>
      </div>
    </div>
  );
};

export const BarChartRevenue = () => {
  const creationYear = 2022; // set your project creation year
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - creationYear + 1 },
    (_, i) => creationYear + i
  );

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const { data: revenueGrowthData } = useAnalyticsRevenueGrowthDataQuery({
    year: selectedYear,
  });

  // Format total revenue text
  const description = () => (
    <div className="flex items-center gap-2 tracking-wider">
      <span className="font-semibold text-black">
        Total {revenueGrowthData?.total_revenue !== undefined
          ? (() => {
          const value = Number(revenueGrowthData.total_revenue);
          if (isNaN(value)) return revenueGrowthData.total_revenue;
          if (value >= 1_000_000_000)
            return `${(value / 1_000_000_000).toFixed(2)}b$`;
          if (value >= 1_000_000)
            return `${(value / 1_000_000).toFixed(2)}m$`;
          if (value >= 1_000)
            return `${(value / 1_000).toFixed(2)}k$`;
          return `${value}$`;
        })()
          : "--"}
      </span>

      {/* Calendar Button with Popover */}
      <Select
        defaultValue={currentYear.toString()}
        onValueChange={setSelectedYear}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  // Custom tick formatter: do not add 'k' for 0
  const yAxisTickFormatter = (value: number) =>
    value === 0 ? "0" : `${value}$`;

  return (
    <Card className=" h-full w-full py-6">
      <CardHeader className="pb-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="tracking-wider">Revenue growth</CardTitle>
          <CardDescription>{description()}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-[24vh] min-w-full"
        >
          <ResponsiveContainer>
            <BarChart
              data={revenueGrowthData?.revenue_growth}
              className="max-h-[18vh] min-w-full"
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              <YAxis
                dataKey="total"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={50}
                tickFormatter={yAxisTickFormatter}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)" }}
                content={<CustomChartTooltipContent />}
              />
              <Bar
                dataKey="total"
                fill="#28C86B"
                radius={[8, 8, 0, 0]}
                name="Revenue"
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
