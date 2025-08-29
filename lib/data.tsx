import { Schedule } from "@/svg/Action";
import { Group, PersonAdd, PersonRemove, Productivity } from "@/svg/OverView";
import React from "react";

// Type definitions
export type UserType = {
  typeuser: string;
  icon: React.ReactNode;
  numuser: number;
  isIncrease: boolean;
  increasepercentage: number;
};
export type Rating = {
  name: string;
  somenum: number;
  suffix?: string;
};

export type PlatformStats = {
  name: string;
  icon: React.ReactNode;
  numuser?: number;
  comppercentage?: number;
  rate: Rating[] | string;
  isGraph: boolean;
};

export type CategoryStats = {
  name: string;
  percentage: number;
};

export type UserActivity = {
  image: string;
  name: string;
  status: "free" | "premium";
  numtimes: number;
};

export type TimePeriod = "Weekly" | "Monthly" | "Yearly";

export type DataCollection = {
  userTypes: UserType[];
  platformStats: PlatformStats[];
  categoryStats: CategoryStats[];
  userActivities: UserActivity[];
};

// Mock React icons (using emojis for simplicity)
const UserIcon = () => <Group />;
const PersonAddIcon = () => <PersonAdd />;
const PersonRemoveIcon = () => <PersonRemove />;
const ProductivityIcon = () => <Productivity />;

// Data arrays for different time periods
export const dataByPeriod: Record<TimePeriod, DataCollection> = {
  Weekly: {
    userTypes: [
      {
        typeuser: "Total Users",
        icon: <UserIcon />,
        numuser: 1250,
        isIncrease: true,
        increasepercentage: 12.5,
      },
      {
        typeuser: "New Users",
        icon: <PersonAddIcon />,
        numuser: 350,
        isIncrease: true,
        increasepercentage: 8.2,
      },
      {
        typeuser: "Premium Users",
        icon: <ProductivityIcon />,
        numuser: 900,
        isIncrease: false,
        increasepercentage: 3.1,
      },
      {
        typeuser: "Deactivated Users",
        icon: <PersonRemoveIcon />,
        numuser: 180,
        isIncrease: true,
        increasepercentage: 15.7,
      },
    ],
    platformStats: [
      {
        name: "Daily Active Users",
        icon: <UserIcon />,
        isGraph: true,
        numuser: 850,
        rate: [{ name: "Engagment Rate", somenum: 32 }],
      },
      {
        name: "Boosting stats",
        icon:<span className="orange p-2"><Schedule /></span> ,
        isGraph: false,
        comppercentage: 12.5,
        rate: [
          { name: "Total Boosted Hours", somenum: 1250,suffix:"hours" },
          { name: "Boosting Engagement Rate", somenum: 41.67,suffix:"%" },
        ],
      },
      {
        name: "Searh Activity Stats",
        icon: <UserIcon />,
        isGraph: false,
        comppercentage: 15.4,
        rate: [
          { name: "Total Searches", somenum: 3450,suffix:"searches" },
          { name: "Search Engagement Rate", somenum: 29.36,suffix:"%" },
        ],
      },
    ],
    categoryStats: [
      { name: "Premium user insights", percentage: 45 },
      { name: "Renewal rate", percentage: 30 },
      { name: "Churn rate", percentage: 25 },
    ],
    userActivities: [
      {
        image: "/user 1.png",
        name: "John Doe",
        status: "premium",
        numtimes: 28,
      },
      {
        image: "/user 2.png",
        name: "Jane Smith",
        status: "free",
        numtimes: 15,
      },
      {
        image: "/user 3.png",
        name: "Mike Johnson",
        status: "premium",
        numtimes: 22,
      },
      {
        image: "/user 4.png",
        name: "Sarah Wilson",
        status: "free",
        numtimes: 12,
      },
    ],
  },
  Monthly: {
    userTypes: [
      {
        typeuser: "Total Users",
        icon: <UserIcon />,
        numuser: 4800,
        isIncrease: true,
        increasepercentage: 18.3,
      },
      {
        typeuser: "New Users",
        icon: <PersonAddIcon />,
        numuser: 1450,
        isIncrease: true,
        increasepercentage: 22.1,
      },
      {
        typeuser: "Premium Users",
        icon: <ProductivityIcon />,
        numuser: 3350,
        isIncrease: true,
        increasepercentage: 5.7,
      },
      {
        typeuser: "Deactivated Users",
        icon: <PersonRemoveIcon />,
        numuser: 650,
        isIncrease: true,
        increasepercentage: 28.9,
      },
    ],
    platformStats: [
      {
        name: "Daily Active Users",
        icon: <UserIcon />,
        isGraph: true,
        numuser: 850,
        rate: [{ name: "Engagment Rate", somenum: 35 }],
      },
      {
        name: "Boosting stats",
        icon: <span className="orange p-2"><Schedule /></span>,
        isGraph: false,
        comppercentage: 12.5,
        numuser: 320,
        rate: [
          { name: "Total Boosted Hours", somenum: 1450,suffix:"hours" },
          { name: "Average Rating", somenum: 50,suffix:"%" },
        ],
      },
      {
        name: "Search Activity Stats",
        icon: <UserIcon />,
        isGraph: false,
        comppercentage: 20.5,
        rate: [
          { name: "Total Searches", somenum: 4500,suffix:"searches" },
          { name: "Search Engagement Rate", somenum: 75.2,suffix:"%" },
        ],
      },
    ],
    categoryStats: [
      { name: "Premium user insights", percentage: 60 },
      { name: "Renewal rate", percentage: 34 },
      { name: "Churn rate", percentage: 15 },
    ],
    userActivities: [
      {
        image: "/user 1.png",
        name: "John Doe",
        status: "premium",
        numtimes: 28,
      },
      {
        image: "/user 2.png",
        name: "Jane Smith",
        status: "free",
        numtimes: 15,
      },
      {
        image: "/user 3.png",
        name: "Mike Johnson",
        status: "premium",
        numtimes: 22,
      },
      {
        image: "/user 4.png",
        name: "Sarah Wilson",
        status: "free",
        numtimes: 12,
      },
    ],
  },
  Yearly: {
    userTypes: [
      {
        typeuser: "Total Users",
        icon: <UserIcon />,
        numuser: 1250,
        isIncrease: true,
        increasepercentage: 12.5,
      },
      {
        typeuser: "New Users",
        icon: <PersonAddIcon />,
        numuser: 350,
        isIncrease: true,
        increasepercentage: 8.2,
      },
      {
        typeuser: "Premium Users",
        icon: <ProductivityIcon />,
        numuser: 900,
        isIncrease: false,
        increasepercentage: 3.1,
      },
      {
        typeuser: "Deactivated Users",
        icon: <PersonRemoveIcon />,
        numuser: 180,
        isIncrease: true,
        increasepercentage: 15.7,
      },
    ],
    platformStats: [
      {
        name: "Daily Active Users",
        icon: <UserIcon />,
        isGraph: true,
        numuser: 850,
        rate: [{ name: "Total Boosted hours", somenum: 1360 }],
      },
      {
        name: "Boosting stats",
        icon: <span className="orange p-2"><Schedule /></span>,
        isGraph: false,
        comppercentage: 19,
        rate: [
          { name: "Total Boosted Hours", somenum: 4500,suffix:"hours" },
          { name: "Boosting Engagement Rate", somenum: 56,suffix:"%" },
        ],
      },
      {
        name: "Search Activity Stats",
        icon: <UserIcon />,
        isGraph: false,
        comppercentage: 25.4,
        rate: [
          { name: "Total Searches", somenum: 8000,suffix:"searches" },
          { name: "Search Engagement Rate", somenum: 45.6,suffix:"%" },
        ],
      },
    ],
    categoryStats: [
      { name: "Premium user insights", percentage: 60 },
      { name: "Renewal rate", percentage: 40 },
      { name: "Churn rate", percentage: 20 },
    ],
    userActivities: [
      {
        image: "/user 1.png",
        name: "John Doe",
        status: "premium",
        numtimes: 28,
      },
      {
        image: "/user 2.png",
        name: "Jane Smith",
        status: "free",
        numtimes: 15,
      },
      {
        image: "/user 3.png",
        name: "Mike Johnson",
        status: "premium",
        numtimes: 22,
      },
      {
        image: "/user 4.png",
        name: "Sarah Wilson",
        status: "free",
        numtimes: 12,
      },
    ],
  },
};

export const getDataByPeriod = (period: TimePeriod): DataCollection => {
  return dataByPeriod[period];
};
