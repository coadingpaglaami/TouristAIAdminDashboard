"use client";
import { NavBar } from "@/component/navbar";
import { Sidebaar } from "@/component/sidebaar";
import { ReactNode  } from "react";
import { usePathname  } from "next/navigation";


const noLayoutPublicRoutes = [
  "/admin/login",
  "/admin/forget-password",
  "/admin/verifyotp",
  "/admin/reset-password",
  "/admin/success",
];

const noLayoutProtectedRoutes = ["/admin/profile", "/admin/security"];

export default function AdminLayOut({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (noLayoutPublicRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  // Protected no-layout pages (must be logged in)
  if (
    noLayoutPublicRoutes.includes(pathname) ||
    noLayoutProtectedRoutes.includes(pathname)
  ) {
    return <>{children}</>;
  }

  return (
    <div className="flex w-full ">
      <div className="max-md:hidden md:block border-r border-gray-200 ">
        <Sidebaar />
      </div>
      <div className="md:flex-1 bg-[#F4F4F4] max-md:w-full md:pl-4">
        <div className="h-20 w-full  bg-white border-b border-gray-200 sticky top-0 z-20">
          <NavBar />
        </div>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
