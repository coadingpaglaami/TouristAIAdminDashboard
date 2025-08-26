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
  percentage: number;
  rating: number;
};

export type PlatformStats = {
  name: string;
  icon: React.ReactNode;
  numuser: number;
  rate: Rating[] | string;
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
        numuser: 850,
        rate: [{ name: "Engagment Rate", percentage: 68, rating: 0 }],
      },
      {
        name: "App Rating by user",
        icon: <UserIcon />,
        numuser: 320,
        rate: [
          { name: "Average Rating", percentage: 40, rating: 4.8 },
          { name: "Average Rating", percentage: 35, rating: 4.5 },
        ],
      },
      {
        name: "Top region user",
        icon: <UserIcon />,
        numuser: 80,
        rate: [
          { name: "Bangladesh", percentage: 66.4, rating: 0 },
          { name: "India", percentage: 33.6, rating: 0 },
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
        numuser: 850,
        rate: [{ name: "Engagment Rate", percentage: 68, rating: 0 }],
      },
      {
        name: "App Rating by user",
        icon: <UserIcon />,
        numuser: 320,
        rate: [
          { name: "Average Rating", percentage: 40, rating: 4.8 },
          { name: "Average Rating", percentage: 35, rating: 4.5 },
        ],
      },
      {
        name: "Top region user",
        icon: <UserIcon />,
        numuser: 80,
        rate: [
          { name: "Bangladesh", percentage: 66.4, rating: 0 },
          { name: "India", percentage: 33.6, rating: 0 },
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
        numuser: 850,
        rate: [{ name: "Engagment Rate", percentage: 68, rating: 0 }],
      },
      {
        name: "App Rating by user",
        icon: <UserIcon />,
        numuser: 320,
        rate: [
          { name: "Average Rating", percentage: 40, rating: 4.8 },
          { name: "Average Rating", percentage: 35, rating: 4.5 },
        ],
      },
      {
        name: "Top region user",
        icon: <UserIcon />,
        numuser: 80,
        rate: [
          { name: "Bangladesh", percentage: 66.4, rating: 0 },
          { name: "India", percentage: 33.6, rating: 0 },
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
};

export const getDataByPeriod = (period: TimePeriod): DataCollection => {
  return dataByPeriod[period];
};
