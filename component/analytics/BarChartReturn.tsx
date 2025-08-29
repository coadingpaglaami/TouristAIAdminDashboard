"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartDataWeek = [
  { day: "Mon", returningUser: 32 },
  { day: "Tue", returningUser: 45 },
  { day: "Wed", returningUser: 51 },
  { day: "Thu", returningUser: 38 },
  { day: "Fri", returningUser: 60 },
  { day: "Sat", returningUser: 49 },
  { day: "Sun", returningUser: 41 },
];

const chartDataMonth = [
  { week: "Week 1", returningUser: 186 },
  { week: "Week 2", returningUser: 305 },
  { week: "Week 3", returningUser: 237 },
  { week: "Week 4", returningUser: 73 },
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
  
  // Prepare data for Chart.js
  const labels = chartData.map(item => item[xAxisKey as keyof typeof item[0]]);
  const dataValues = chartData.map(item => item.returningUser);
  
  const data = {
    labels,
    datasets: [
      {
        label: "Returning Users",
        data: dataValues,
        backgroundColor: "#FF7A00",
        borderRadius: 8,
        barPercentage: 0.6,
      },
    ],
  };
  
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        borderColor: "#ddd",
        borderWidth: 1,
        displayColors: false,
        padding: 12,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            return `Users: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#1C1B1F",
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "#E5E5E5",
        },
        ticks: {
          color: "#1C1B1F",
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Card className="rounded-lg h-full flex flex-col">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="tracking-wider text-base md:text-lg">
            Returning Users
          </CardTitle>
          <CardTitle className="flex justify-end mt-2">
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setRange("week")}
                className={`p-1 md:p-2 text-xs md:text-sm rounded-full tracking-wider font-light ${
                  range === "week"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setRange("month")}
                className={`p-1 md:p-2 text-xs md:text-sm rounded-full tracking-wider font-light ${
                  range === "month"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRange("year")}
                className={`p-1 md:p-2 text-xs md:text-sm rounded-full tracking-wider font-light ${
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
        <CardContent className="rounded-lg p-2 md:p-4 pt-0 flex-1">
          <div className="h-full min-w-full">
            <Bar data={data} options={options} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};