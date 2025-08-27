"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CardMemberShip,
  CardMemberShipWhite,
  Dashboard,
  DashboardWhite,
  MangeAccounts,
  MangeAccountsWhite,
  Message,
  MessageSmall,
  MetaBolism,
  MetaBolismWhite,
  Paid,
  PaidWhite,
  PieChart,
  PieChartWhite,
  Settings,
} from "@/svg/Sidebaar";

import { usePathname } from "next/navigation";
import Link from "next/dist/client/link";
import { useState } from "react";
import Image from "next/image";
export const NavBar = () => {
  const pathname = usePathname();
  const [profile, openprofile] = useState(false);
  const menus = [
    {
      path: "/admin/dashboard",
      label: "Overview",
      inactiveIcon: <Dashboard />,
      activeIcon: <DashboardWhite />,
    },
    {
      path: "/admin/useractivity",
      label: "User Activity",
      inactiveIcon: <MetaBolism />,
      activeIcon: <MetaBolismWhite />,
    },
    {
      path: "/admin/manage-user",
      label: "Manage User",
      inactiveIcon: <MangeAccounts />,
      activeIcon: <MangeAccountsWhite />,
    },
    {
      path: "/admin/analytics",
      label: "Analytics",
      inactiveIcon: <PieChart />,
      activeIcon: <PieChartWhite />,
    },
    {
      path: "/admin/payment",
      label: "Payment Record",
      inactiveIcon: <Paid />,
      activeIcon: <PaidWhite />,
    },
    {
      path: "/admin/subscription",
      label: "Subscription",
      inactiveIcon: <CardMemberShip />,
      activeIcon: <CardMemberShipWhite />,
    },
  ];
  const adminpage = [
    {
      path: "/admin/profile",
      label: "Profile",
      inactiveIcon: <CardMemberShip />,
      activeIcon: <CardMemberShipWhite />,
    },
    {
      path: "/admin/security",
      label: "Security",
      inactiveIcon: <Dashboard />,
      activeIcon: <DashboardWhite />,
    },
  ];
  return (
    <div className="md:px-4 h-full leading-[100%] flex items-center max-md:gap-4 text-xl font-bold">
      <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild className="">
          <Button variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader></SheetHeader>
          {/* Logo + Text */}
          <div className="flex flex-col gap-2 relative z-30">
            {/* Logo + Text */}
            <Link
              href="/admin/dashboard"
              onClick={() => openprofile(false)}
              className="flex flex-col rounded-lg justify-center items-center gap-2"
            >
              {/* Large Logo - Desktop */}
              <div className="orange p-4 rounded-lg hidden lg:block">
                <Message />
              </div>

              {/* Small Logo - Tablet */}
              <div className="orange p-2 rounded-lg hidden md:block lg:hidden">
                <MessageSmall />
              </div>

              {/* Brand Text - Desktop only */}
              <h4 className="text-2xl font-bold tracking-[0.3em] text-[#854C3A] ">
                TRIPMATE
              </h4>
            </Link>

            {/* Menu Items */}
            {profile ? (
              <div className="flex flex-col gap-2 mt-12">
                {adminpage.map(({ path, label, inactiveIcon, activeIcon }) => {
                  const isActive =
                    pathname === path || pathname.startsWith(`${path}/`);
                  return (
                    <Link
                      key={path}
                      href={path}
                      className={`p-2 flex items-center gap-2 rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
                        isActive ? "orange text-white" : "text-[#854C3A]"
                      }`}
                    >
                      {isActive ? activeIcon : inactiveIcon}
                      <span className="">{label}</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-12">
                {menus.map(({ path, label, inactiveIcon, activeIcon }) => {
                  const isActive =
                    pathname === path || pathname.startsWith(`${path}/`);
                  return (
                    <Link
                      key={path}
                      href={path}
                      className={`p-2 flex items-center gap-2 rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
                        isActive ? "orange text-white" : "text-[#854C3A]"
                      }`}
                    >
                      {isActive ? activeIcon : inactiveIcon}
                      <span className="">{label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <SheetFooter>
            {!profile && (
              <Link
                href="/admin/profile"
                onClick={() => openprofile(!profile)}
                className="flex gap-2 mx-2 items-center justify-between"
              >
                <Image
                  src="/user.png"
                  alt="user"
                  height={100}
                  width={100}
                  className="rounded-full h-14 w-14"
                />

                {/* Profile details - Desktop only */}
                <div className=" flex-col gap-1 text-[#854C3A]  lg:flex">
                  <span className="text-lg font-medium">Ostain Alex</span>
                  <span className="font-thin">TRIPMATE</span>
                </div>

                <div className="">
                  <Settings />
                </div>
              </Link>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      </div>
      Good morning “Jason Wancs”
    </div>
  );
};
