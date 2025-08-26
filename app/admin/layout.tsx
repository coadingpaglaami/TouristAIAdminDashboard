// import { NavBar } from "@/component/navbar";
// import { Sidebaar } from "@/component/sidebaar";
// import { ReactNode } from "react";

import { NavBar } from "@/component/navbar";
import { Sidebaar } from "@/component/sidebaar";
import { ReactNode } from "react";

// export default function DashboardLayOut({ children }: { children: ReactNode }) {
//   return (
//     <div className="max-w-full font-inter">
//       <div className="flex w-full ">
//         <div className=" border-r border-gray-200">
//           <Sidebaar />
//         </div>
//         <div className="flex-1 bg-[#F4F4F4] pl-4">    
//           <div className="h-20 w-full sticky top-0 bg-white border-b border-gray-200 z-20">
//             <NavBar />
//           </div>
//           <div >{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function DashboardLayOut({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-full font-inter">
      <div className="flex w-full ">
        {/* Sidebar */}
        <div className="hidden md:block border-r border-gray-200 ">
          {/* normal sidebar for PC */}
          <Sidebaar />
        </div>

        {/* Mobile sidebar (absolute / fixed) */}
        <div className="md:hidden fixed top-0 left-0 h-full w-14 z-30 bg-white">
          <Sidebaar />
        </div>

        {/* Main content */}
        <div className="md:flex-1 bg-[#F4F4F4] pl-4 ">
          {/* Navbar */}
          <div className="h-20 w-full sticky top-0 bg-white border-b border-gray-200 z-20">
            <NavBar />
          </div>
          {/* Page children */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

