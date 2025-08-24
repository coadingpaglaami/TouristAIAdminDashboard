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

export type PlatformStats = {
  name: string;
  icon: React.ReactNode;
  numuser: number;
  rate: "Engagment Rate" | "Retention Rate" | "Growth Rate";
  percentage: number;
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
const UserIcon = () => <Group/>;
const PersonAddIcon=()=><PersonAdd/>
const PersonRemoveIcon=()=><PersonRemove/>
const ProductivityIcon=()=><Productivity/>

// Data arrays for different time periods
export const dataByPeriod: Record<TimePeriod, DataCollection> = {
  Weekly: {
    userTypes: [
      {
        typeuser: "Active Users",
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
        name: "Daily active users",
        icon: <UserIcon />,
        numuser: 850,
        rate: "Engagment Rate",
        percentage: 68,
      },
      {
        name: "Monthly active users",
        icon: <UserIcon />,
        numuser: 320,
        rate: "Retention Rate",
        percentage: 25.6,
      },
      {
        name: "Yearly active users",
        icon: <UserIcon />,
        numuser: 80,
        rate: "Growth Rate",
        percentage: 66.4,
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
        typeuser: "Active Users",
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
        name: "Daily active users",
        icon: <UserIcon />,
        numuser: 3200,
        rate: "Engagment Rate",
        percentage: 66.7,
      },
      {
        name: "Monthly active users",
        icon: <UserIcon />,
        numuser: 1250,
        rate: "Retention Rate",
        percentage: 26,
      },
      {
        name: "Yearly active users",
        icon: <UserIcon />,
        numuser: 350,
        rate: "Growth Rate",
        percentage: 7.3,
      },
    ],
    categoryStats: [
      { name: "Premium user insights", percentage: 42 },
      { name: "Renewal rate", percentage: 33 },
      { name: "Churn rate", percentage: 25 },
    ],
    userActivities: [
      {
        image: "/user 1.png",
        name: "John Doe",
        status: "premium",
        numtimes: 95,
      },
      {
        image: "/user 2.png",
        name: "Jane Smith",
        status: "free",
        numtimes: 62,
      },
      {
        image: "/user 3.png",
        name: "Mike Johnson",
        status: "premium",
        numtimes: 88,
      },
      {
        image: "/user 4.png",
        name: "Sarah Wilson",
        status: "free",
        numtimes: 51,
      },
    ],
  },
  Yearly: {
    userTypes: [
      {
        typeuser: "Active Users",
        icon: <UserIcon />,
        numuser: 55200,
        isIncrease: true,
        increasepercentage: 25.8,
      },
      {
        typeuser: "New Users",
        icon: <PersonAddIcon />,
        numuser: 17800,
        isIncrease: true,
        increasepercentage: 31.4,
      },
      {
        typeuser: "Premium Users",
        icon: <ProductivityIcon />,
        numuser: 37400,
        isIncrease: true,
        increasepercentage: 12.3,
      },
      {
        typeuser: "Deactivated Users",
        icon: <PersonRemoveIcon />,
        numuser: 7800,
        isIncrease: true,
        increasepercentage: 45.2,
      },
    ],
    platformStats: [
      {
        name: "Daily active users",
        icon: <UserIcon />,
        numuser: 36800,
        rate: "Engagment Rate",
        percentage: 66.7,
      },
      {
        name: "Monthly active users",
        icon: <UserIcon />,
        numuser: 14400,
        rate: "Retention Rate",
        percentage: 26.1,
      },
      {
        name: "Yearly active users",
        icon: <UserIcon />,
        numuser: 4000,
        rate: "Growth Rate",
        percentage: 7.2,
      },
    ],
    categoryStats: [
      { name: "Premium user insights", percentage: 40 },
      { name: "Renewal rate", percentage: 35 },
      { name: "Churn rate", percentage: 25 },
    ],
    userActivities: [
      {
        image: "/user 1.png",
        name: "John Doe",
        status: "premium",
        numtimes: 1120,
      },
      {
        image: "/user 2.png",
        name: "Jane Smith",
        status: "free",
        numtimes: 780,
      },
      {
        image: "/user 3.png",
        name: "Mike Johnson",
        status: "premium",
        numtimes: 980,
      },
      {
        image: "/user 4.png",
        name: "Sarah Wilson",
        status: "free",
        numtimes: 650,
      },
    ],
  },
};

export const getDataByPeriod = (period: TimePeriod): DataCollection => {
  return dataByPeriod[period];
};
