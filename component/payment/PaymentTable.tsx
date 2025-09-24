"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Delete,
  Chevron,
  ChevronNext,
  Instruction,
  Play,
  Pause,
} from "@/svg/Action";
import React from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserSubscription } from "@/interface/BoosterRecord";
import { AvatarAndImage } from "../reusable";
import {
  useBoosterDeleteMutation,
  useBoosterPauseMutation,
} from "@/services/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

function getPagination(current: number, total: number) {
  const delta = 2;
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number = 0;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}

interface PaymentTable {
  data: UserSubscription[];
  count: number;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  perPage: number;
}
export const PaymentTable = ({
  data,
  count,
  isLoading,
  page,
  setPage,
  perPage,
}: PaymentTable) => {
  const [deleteUser, setDeleteUser] = useState<UserSubscription | null>(null);
  const totalPages = Math.ceil(count / perPage);
  const [pauseMutation] = useBoosterPauseMutation();
  const [deleteMutation] = useBoosterDeleteMutation();
  const handleBlockToggle = async (idx: number, action: string) => {
   if(action === "pause") action = "play";
   else action = "pause";
    try {
      await pauseMutation({ id: idx, action }).unwrap();
      toast.success(
        `Subscription has been ${action === "pause" ? "paused" : "played"}`,
        { richColors: true }
      );
    } catch (error) {
      toast.error("Failed to update user status", { richColors: true });
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;

    // Update the data state by removing the user
    try {
      await deleteMutation(deleteUser.id).unwrap();
      toast.success(`${deleteUser?.user.username} has been deleted`, {
        richColors: true,
      });
      setDeleteUser(null); // Close the delete dialog
    } catch (error) {
      toast.error("Failed to delete user", { richColors: true });
      console.log(error)
    }
  };

  // Filter Data based on search and duration

  const paginationNumbers = getPagination(page, totalPages);

  return (
    <div className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-2xl tracking-wider mb-2 ">Booster purchase record</h3>
      <div className="overflow-x-auto max-md:max-w-[85vw]">
        <Table className="border-b border-gray-300 pb-8">
          <TableHeader>
            <TableRow className="">
              <TableHead className="text-xs font-semibold text-gray-500  py-3">
                User
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500  text-center py-3">
                Subscription
              </TableHead>

              <TableHead className="text-xs font-semibold text-gray-500 text-center py-3">
                Duration
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500  py-3 text-center">
                Amount
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500  py-3 text-center">
                Last Active
              </TableHead>
              <TableHead className="text-xs text-[#969696] px-6">
                <div className="flex items-center gap-2 justify-center text-xs">
                  <span className="text-xs">Action</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="border-none ">
                        <Instruction />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span>
                            {" "}
                            <Pause />
                          </span>
                          <span className="pb-1 text-sm">
                            Block Subscription
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="pl-1">
                            <Delete />
                          </span>
                          <span className="pb-1 text-sm">
                            Delete Subscription
                          </span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="tracking-wider">
            {isLoading
              ? Array.from({ length: 7 }).map((_, idx) => (
                  <TableRow key={idx} className="border-none">
                    {/* User */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center">
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </TableCell>

                    {/* Duration */}
                    <TableCell className="py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="py-4 text-center">
                      <Skeleton className="h-4 w-12 mx-auto" />
                    </TableCell>

                    {/* Last Active */}
                    <TableCell className="py-4 text-center">
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : data.map((item, idx) => {
                  const globalIdx = (page - 1) * perPage + idx;
                  const isBlocked = item.action.pause_play === "pause";
                  const given = new Date(item.expire_time);
                  const now = new Date();
                  const isExpired = given <= now;

                  return (
                    <TableRow
                      key={globalIdx}
                      className="transition hover:bg-gray-50 border-none"
                    >
                      {/* User */}
                      <TableCell
                        className={`py-4 ${isBlocked ? "opacity-30" : ""}`}
                      >
                        <AvatarAndImage
                          username={item.user.username}
                          avatar_url={item.user.avatar}
                        />
                      </TableCell>
                      {/* Status */}
                      <TableCell
                        className={`py-4 text-center ${
                          isBlocked ? "opacity-30" : ""
                        }`}
                      >
                        <div className="flex justify-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold mb-1 bg-[#BDBDBD]`}
                          >
                            {item.subscription_name}
                          </span>
                        </div>
                      </TableCell>
                      {/* Duration */}
                      <TableCell
                        className={`py-4 text-center ${
                          isBlocked ? "opacity-30" : ""
                        }`}
                      >
                        <div className="flex text-sm flex-col gap-1">
                          <span>{item.activate_time}</span>
                          <span className="text-center text-[#969696]">
                            {item.expire_time}
                          </span>
                        </div>
                      </TableCell>
                      {/* Amount */}
                      <TableCell
                        className={`py-4 text-center ${
                          isBlocked ? "opacity-30" : ""
                        }`}
                      >
                        <span className="font-semibold text-gray-700">
                          ${item.amount}
                        </span>
                      </TableCell>
                      {/* Last Active */}
                      <TableCell
                        className={`py-4 text-center ${
                          isBlocked ? "opacity-30" : ""
                        }`}
                      >
                        <span className="text-sm">{item.last_active}</span>
                      </TableCell>
                      {/* Action */}
                      <TableCell className="py-4 text-center">
                        <div className="flex gap-2 justify-center">
                        {!isExpired &&  <button
                            className={"p-2 hover:bg-gray-100 rounded transition"}
                            title={isBlocked ? "Play" : "Pause"}
                            onClick={() =>
                              handleBlockToggle(item.id, item.action.pause_play)
                            }
                          >
                            { isBlocked ? <Play /> : <Pause />}
                          </button>}
                          <button
                            className="p-2 hover:bg-gray-100 rounded transition"
                            title="Delete"
                            onClick={() => setDeleteUser(item)}
                          >
                            <Delete />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
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
                {deleteUser?.user.username}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUser(null)}>
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

      {/* Pagination Controls */}
      <div className="flex md:items-center md:justify-between md:flex-row flex-col mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, count)} from {count} records
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-3.5 rounded disabled:opacity-50 border border-[#4C5363] flex justify-center items-center"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <Chevron />
          </button>
          {paginationNumbers.map((num, idx) =>
            typeof num === "number" ? (
              <button
                key={idx}
                className={`p-2 rounded px-3 ${
                  num === page
                    ? " text-green-600 border-2 border-[#F7C56B]"
                    : "border border-black text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    num === page ? "rgba(247, 197, 107, 0.3)" : "",
                }}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ) : (
              <span key={idx} className="px-2">
                ...
              </span>
            )
          )}
          <button
            className="p-3.5 rounded disabled:opacity-50 border border-[#4C5363] flex justify-center items-center"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <ChevronNext />
          </button>
        </div>
      </div>
    </div>
  );
};
