// "use client";
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Chevron, Delete, Pause, Play, Schedule } from "@/svg/Action";

// interface Plan {
//   name: string;
//   duration: number;
//   durationUnit: "Hour" | "Day";
//   price: number;
//   status: "Active" | "Inactive";
// }

// const plansData: Plan[] = [
//   {
//     name: "1 Hour boost",
//     duration: 1,
//     durationUnit: "Hour",
//     price: 5,
//     status: "Active",
//   },
//   {
//     name: "3 Hours boost",
//     duration: 3,
//     durationUnit: "Hour",
//     price: 12,
//     status: "Active",
//   },
//   {
//     name: "Premium Hourly",
//     duration: 6,
//     durationUnit: "Hour",
//     price: 20,
//     status: "Inactive",
//   },
//   {
//     name: "1 Day Basic Daily",
//     duration: 1,
//     durationUnit: "Day",
//     price: 25,
//     status: "Active",
//   },
//   {
//     name: "3 Days Standard Daily",
//     duration: 3,
//     durationUnit: "Day",
//     price: 60,
//     status: "Active",
//   },
//   {
//     name: "7 Days Premium Daily",
//     duration: 7,
//     durationUnit: "Day",
//     price: 120,
//     status: "Inactive",
//   },
//   {
//     name: "2 Days Weekend Pass",
//     duration: 2,
//     durationUnit: "Day",
//     price: 40,
//     status: "Active",
//   },
//   {
//     name: "8 Hours Night Owl",
//     duration: 8,
//     durationUnit: "Hour",
//     price: 15,
//     status: "Inactive",
//   },
//   {
//     name: "5 Days Explorer",
//     duration: 5,
//     durationUnit: "Day",
//     price: 90,
//     status: "Active",
//   },
//   {
//     name: "2 Hours boost",
//     duration: 2,
//     durationUnit: "Hour",
//     price: 8,
//     status: "Active",
//   },
// ];
// export const SubscriptionPlan = () => {
//   const [plans, setPlans] = useState<Plan[]>(plansData);
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 5;
//   const totalPages = Math.ceil(plans.length / rowsPerPage);

//   const toggleStatus = (index: number) => {
//     setPlans((prev) =>
//       prev.map((plan, i) =>
//         i === index
//           ? {
//               ...plan,
//               status: plan.status === "Active" ? "Inactive" : "Active",
//             }
//           : plan
//       )
//     );
//   };

//   const paginatedPlans = plans.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // Generate pagination numbers with a range to display
//   const paginationNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     paginationNumbers.push(i);
//   }

//   return (
//     <div className="bg-white rounded-lg p-4 h-full">
//       <h2 className="font-semibold tracking-wider text-xl text-[#1C1B1F]">
//         All subscription plans
//       </h2>
//       <div className="max-w-screen w-full overflow-x-auto">
//       <Table className="">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-sm text-[#969696]">Plan Name</TableHead>
//             <TableHead className="text-sm text-[#969696]">Duration</TableHead>
//             <TableHead className="text-sm text-[#969696]">Price</TableHead>
//             <TableHead className="text-sm text-[#969696]">Status</TableHead>
//             <TableHead className="text-sm text-[#969696]">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {paginatedPlans.map((plan, idx) => (
//             <TableRow
//               key={idx + (page - 1) * rowsPerPage}
//               className="border-none"
//             >
//               <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
//                 <div className="flex items-center gap-2">
//                   <div className="bg-[#FF7A00] p-2">
//                     <Schedule />
//                   </div>
//                   {plan.name}
//                 </div>
//               </TableCell>
//               <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
//                 {plan.duration} {plan.durationUnit}
//               </TableCell>
//               <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
//                 ${plan.price} HK
//               </TableCell>
//               <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold  ${
//                     plan.status === "Active"
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-300 text-gray-700"
//                   }`}
//                 >
//                   {plan.status}
//                 </span>
//               </TableCell>
//               <TableCell>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => toggleStatus(idx + (page - 1) * rowsPerPage)}
//                   >
//                     {plan.status === "Active" ? <Pause /> : <Play />}
//                   </button>
//                   <button className="text-red-500">
//                     <Delete />
//                   </button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       </div>
//       <div className="flex justify-end mt-4 gap-2 items-center">
//         <button
//           className="p-3.5 rounded border-2 border-[#4C5363] disabled:opacity-50"
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//         >
//           <Chevron />
//         </button>

//         {/* Pagination Numbers */}
//         {paginationNumbers.map((num, idx) =>
//           num === page ? (
//             <button
//               key={idx}
//               className="p-2 rounded px-3 text-green-600 border-2 border-[#F7C56B]"
//               onClick={() => setPage(num)}
//             >
//               {num}
//             </button>
//           ) : (
//             <button
//               key={idx}
//               className="p-2 rounded px-3 border-2 border-[#4C5363]"
//               onClick={() => setPage(num)}
//             >
//               {num}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Chevron, Delete, Pause, Play, Schedule } from "@/svg/Action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Plan {
  name: string;
  duration: number;
  durationUnit: "Hour" | "Day";
  price: number;
  status: "Active" | "Inactive";
}

const plansData: Plan[] = [
  {
    name: "1 Hour boost",
    duration: 1,
    durationUnit: "Hour",
    price: 5,
    status: "Active",
  },
  {
    name: "3 Hours boost",
    duration: 3,
    durationUnit: "Hour",
    price: 12,
    status: "Active",
  },
  {
    name: "Premium Hourly",
    duration: 6,
    durationUnit: "Hour",
    price: 20,
    status: "Inactive",
  },
  {
    name: "1 Day Basic Daily",
    duration: 1,
    durationUnit: "Day",
    price: 25,
    status: "Active",
  },
  {
    name: "3 Days Standard Daily",
    duration: 3,
    durationUnit: "Day",
    price: 60,
    status: "Active",
  },
  {
    name: "7 Days Premium Daily",
    duration: 7,
    durationUnit: "Day",
    price: 120,
    status: "Inactive",
  },
  {
    name: "2 Days Weekend Pass",
    duration: 2,
    durationUnit: "Day",
    price: 40,
    status: "Active",
  },
  {
    name: "8 Hours Night Owl",
    duration: 8,
    durationUnit: "Hour",
    price: 15,
    status: "Inactive",
  },
  {
    name: "5 Days Explorer",
    duration: 5,
    durationUnit: "Day",
    price: 90,
    status: "Active",
  },
  {
    name: "2 Hours boost",
    duration: 2,
    durationUnit: "Hour",
    price: 8,
    status: "Active",
  },
];

export const SubscriptionPlan = () => {
  const [plans, setPlans] = useState<Plan[]>(plansData);
  const [page, setPage] = useState(1);
  const [deletePlan, setDeletePlan] = useState<Plan | null>(null);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(plans.length / rowsPerPage);

  const toggleStatus = (index: number) => {
    setPlans((prev) =>
      prev.map((plan, i) =>
        i === index
          ? {
              ...plan,
              status: plan.status === "Active" ? "Inactive" : "Active",
            }
          : plan
      )
    );
  };

  const handleDelete = () => {
    if (!deletePlan) return;

    // Remove the plan from the list
    setPlans((prevPlans) =>
      prevPlans.filter((plan) => plan.name !== deletePlan.name)
    );
    setDeletePlan(null); // Close the dialog after deletion
  };

  const paginatedPlans = plans.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Generate pagination numbers with a range to display
  const paginationNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <h2 className="font-semibold tracking-wider text-xl text-[#1C1B1F]">
        All subscription plans
      </h2>
      <div className="max-w-screen w-full overflow-x-auto">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm text-[#969696]">
                Plan Name
              </TableHead>
              <TableHead className="text-sm text-[#969696]">Duration</TableHead>
              <TableHead className="text-sm text-[#969696]">Price</TableHead>
              <TableHead className="text-sm text-[#969696]">Status</TableHead>
              <TableHead className="text-sm text-[#969696]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPlans.map((plan, idx) => (
              <TableRow
                key={idx + (page - 1) * rowsPerPage}
                className="border-none"
              >
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#FF7A00] p-2">
                      <Schedule />
                    </div>
                    {plan.name}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  {plan.duration} {plan.durationUnit}
                </TableCell>
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  ${plan.price} HK
                </TableCell>
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold  ${
                      plan.status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {plan.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toggleStatus(idx + (page - 1) * rowsPerPage)
                      }
                    >
                      {plan.status === "Active" ? <Pause /> : <Play />}
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => setDeletePlan(plan)}
                    >
                      <Delete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4 gap-2 items-center">
        <button
          className="p-3.5 rounded border-2 border-[#4C5363] disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <Chevron />
        </button>

        {/* Pagination Numbers */}
        {paginationNumbers.map((num, idx) =>
          num === page ? (
            <button
              key={idx}
              className="p-2 rounded px-3 text-green-600 border-2 border-[#F7C56B]"
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ) : (
            <button
              key={idx}
              className="p-2 rounded px-3 border-2 border-[#4C5363]"
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          )
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletePlan}
        onOpenChange={(open) => !open && setDeletePlan(null)}
      >
        <DialogTrigger asChild>
          <button className="p-2 hover:bg-gray-100 rounded" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {deletePlan?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletePlan(null)}>
              Cancel
            </Button>
            <Button
              className="p-2 rounded-md orange text-white"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
