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
import {
  useBoostPausePlayMutation,
  useBoostShowQuery,
  useDeleteBoostMutation,
} from "@/services/api";
import { SubscriptionPlanInfo } from "@/interface/Subscription";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";


export const SubscriptionPlan = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const {
    data: boosterdata,
    isFetching,
    refetch,
  } = useBoostShowQuery({
    page,
    limit: rowsPerPage,
  });
  const [boostPausePlay] = useBoostPausePlayMutation();
  const [deleteBoost, { isLoading: isDeleting }] = useDeleteBoostMutation();
  const [deletePlan, setDeletePlan] = useState<SubscriptionPlanInfo | null>(
    null
  );
  const count = boosterdata?.count || 0;
  const totalPages = Math.ceil(count / rowsPerPage);

  const toggleStatus = async (index: number, is_paused: boolean) => {
    console.log("Paused", is_paused);
    try {
      console.log("Toggling plan id:", index, "to", !is_paused);
      await boostPausePlay({
        id: index,
        is_paused: !is_paused,
      }).unwrap();
      await refetch();
      console.log(`Successfully toggled plan to`);
    } catch (error) {
      console.error("Error toggling status:", error);
      // rollback if API fails
    }
  };
  const handleDelete = async (deletePlan: SubscriptionPlanInfo | null) => {
    if (!deletePlan) return;

    try {
      await deleteBoost(deletePlan.id).unwrap();
      toast.success(`Deleted ${deletePlan.name}`, {
        richColors: true,
      });
      await refetch(); // refresh data after deletion
      setDeletePlan(null); // Close the dialog
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

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
      <div className=" w-full overflow-x-auto">
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
            {isFetching
              ? Array.from({ length: rowsPerPage }).map((_, idx) => (
                  <TableRow key={`skeleton-${idx}`} className="border-none">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#FF7A00] p-2">
                          <Schedule />
                        </div>
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-md" />
                        <Skeleton className="h-6 w-6 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : boosterdata?.results?.map((plan, idx) => (
                  <TableRow
                    key={idx + (page - 1) * rowsPerPage}
                    className="border-none"
                  >
                    <TableCell
                      className={`text-sm text-[#1C1B1F] font-medium tracking-wider ${
                        plan.status === "Inactive" ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-[#FF7A00] p-2">
                          <Schedule />
                        </div>
                        {plan.name}
                      </div>
                    </TableCell>
                    <TableCell
                      className={`text-sm text-[#1C1B1F] font-medium tracking-wider ${
                        plan.status === "Inactive" ? "opacity-50" : ""
                      }`}
                    >
                      {plan.duration}
                    </TableCell>
                    <TableCell
                      className={`text-sm text-[#1C1B1F] font-medium tracking-wider ${
                        plan.status === "Inactive" ? "opacity-50" : ""
                      }`}
                    >
                      {plan.price}
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
                          onClick={() => toggleStatus(plan.id, plan.is_paused)}
                        >
                          {plan.is_paused ? <Play /> : <Pause />}
                        </button>
                        <Dialog
                          open={!!deletePlan && deletePlan.id === plan.id}
                          onOpenChange={(open) =>
                            !open ? setDeletePlan(null) : setDeletePlan(plan)
                          }
                        >
                          <DialogTrigger asChild>
                            <button
                              className="p-2 hover:bg-gray-100 rounded"
                              title="Delete"
                              onClick={() => setDeletePlan(plan)}
                            >
                              <Delete />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Confirmation</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-red-600">
                                  {deletePlan?.name}
                                </span>
                                ? <br /> This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setDeletePlan(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="orange p-2 rounded-md"
                                onClick={async () => handleDelete(deletePlan)}
                                disabled={isDeleting}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
    </div>
  );
};
