import { NavBar } from "@/component/navbar";
import { Sidebaar } from "@/component/sidebaar";
import { ReactNode } from "react";

export default function DashboardLayOut({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-full font-inter ">
      <div className="flex w-full ">
        <div className="max-md:hidden md:block border-r border-gray-200 ">
          <Sidebaar isProfile={true} />
        </div>

        {/* Main content */}
        <div className="md:flex-1 bg-[#F4F4F4] md:pl-4 ">
          {/* Navbar */}
          <div className="h-20 w-full  bg-white border-b border-gray-200 sticky top-0 z-20">
            <NavBar isprofile={true} />
          </div>
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}
