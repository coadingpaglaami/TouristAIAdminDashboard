"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useState } from "react";
import Image from "next/image";
import {
  Delete,
  Block,
  CheckCircle,
  Chevron,
  ChevronNext,
  Edit,
  Instruction,
} from "@/svg/Action";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/interface/ManageUser";
import {
  useBanUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useUnbanUserMutation,
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

interface UserTableProps {
  data: User[];
  count: number;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  perPage: number;
}

export const UserTable = ({
  data,
  count,
  isLoading,
  page,
  setPage,
  perPage,
}: UserTableProps) => {
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [bannedUser, setBannedUser] = useState<User | null>(null);
  const [banDuration, setBanDuration] = useState("1h");
  const [duration, setDuration] = useState("1h");
  const totalPages = Math.ceil(count / perPage);
  const [editUserInfo, { isLoading: isEditing }] = useEditUserMutation();
  const [deleteUserInfo, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [banUserInfo, { isLoading: isBanning }] = useBanUserMutation();
  const [unbanUserInfo, { isLoading: isUnbanning }] = useUnbanUserMutation();

  const handleDelete = async (id?: number) => {
    console.log("Deleting user with id:", id);
    if (!id) return;
    try {
      await deleteUserInfo(id).unwrap(); // call API
      setDeleteUser(null); // close dialog
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };
  const handleEdit = async (id?: number, duration?: string) => {
    if (!id) return;
    try {
      await editUserInfo({ id, duration: duration || "" }).unwrap();
      toast.success(`${selectedUser?.user.username} updated for ${duration}`, {
        richColors: true,
      });
      setSelectedUser(null);
    } catch (err) {
      toast.error("Failed to edit user", { richColors: true });
      console.error("Failed to edit:", err);
    }
  };
  const handleBannedUser = (id?: number, duration?: string) => async () => {
    if (!id) return;
    try {
      await banUserInfo({ id, duration: duration || "" }).unwrap();
      toast.success(`${bannedUser?.user.username} banned for ${duration}`, {
        richColors: true,
      });
      setDuration("1h");
      setBannedUser(null);
    } catch (err) {
      toast.error("Failed to ban user", { richColors: true });
      console.error("Failed to edit:", err);
    }
  };
  const handleUnbanUser = (id?: number) => async () => {
    if (!id) return;
    try {
      await unbanUserInfo(id).unwrap();
      toast.success(`${bannedUser?.user.username} has been unbanned`, {
        richColors: true,
      });
      setBannedUser(null);
    } catch (err) {
      toast.error("Failed to unban user", { richColors: true });
      console.error("Failed to unban:", err);
    }
  };

  const paginationNumbers = getPagination(page, totalPages);

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg">
      <h3 className="text-2xl tracking-wider">Manage Users</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs text-[#969696]">User</TableHead>
              <TableHead className="text-xs text-[#969696] text-center">
                Status
              </TableHead>
              <TableHead className="text-xs text-[#969696] text-center">
                Subscription
              </TableHead>
              <TableHead className="text-xs text-[#969696]">Email</TableHead>
              <TableHead className="text-xs text-[#969696]">
                Last Active
              </TableHead>
              <TableHead className="text-xs text-[#969696] px-6">
                <div className="flex items-center gap-2 ">
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
                            <Edit />
                          </span>
                          <span className="pb-1 text-sm">
                            Edit User Information
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>
                            {" "}
                            <Block />
                          </span>
                          <span className="pb-1 text-sm">Block User</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>
                            <Delete />
                          </span>
                          <span className="pb-1 text-sm">Delete User</span>
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
              ? [...Array(7)].map((_, idx) => (
                  <TableRow key={idx} className="border-none">
                    {/* User (avatar + name) */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-4 w-24 rounded-md" />
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <div className="flex justify-center">
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    </TableCell>

                    {/* Subscription */}
                    <TableCell>
                      <div className="flex justify-center">
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      <Skeleton className="h-4 w-40 rounded-md" />
                    </TableCell>

                    {/* Last Active */}
                    <TableCell>
                      <Skeleton className="h-4 w-28 rounded-md" />
                    </TableCell>

                    {/* Actions (3 buttons: edit, ban/unban, delete) */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Skeleton className="w-8 h-8 rounded-md" />
                        <Skeleton className="w-8 h-8 rounded-md" />
                        <Skeleton className="w-8 h-8 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : data.map((item, idx) => {
                  const globalIdx = (page - 1) * perPage + idx;
                  const isBlocked = item.actions.can_ban === false; // Example condition
                  return (
                    <TableRow
                      key={globalIdx}
                      className="border-none transition-opacity"
                    >
                      {/* User */}
                      <TableCell
                        className={isBlocked ? "opacity-50" : "opacity-100"}
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full p-2">
                            <Image
                              src={item.user.avatar || "/avatar.png"}
                              alt={item.user.username}
                              fill
                              className="  border border-gray-200 object-cover rounded-full"
                            />
                          </div>
                          <div className="font-medium">
                            {item.user.username.charAt(0).toUpperCase() + item.user.username.slice(1).toLowerCase()}
                          </div>
                        </div>
                      </TableCell>
                      {/* Status */}
                      <TableCell
                        className={
                          isBlocked
                            ? "opacity-50"
                            : "opacity-100 " + "align-middle"
                        }
                      >
                        <div className="flex justify-center items-center">
                          <div
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full  max-w-20 w-fit ${
                              item.status.text === "Active"
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {item.status.text}
                          </div>
                        </div>
                      </TableCell>
                      {/* Subscription */}
                      <TableCell
                        className={isBlocked ? "opacity-50" : "opacity-100"}
                      >
                        <div className="flex justify-center items-center">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.subscription.text === "Premium"
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {item.subscription.text}
                          </div>
                        </div>
                      </TableCell>
                      {/* Email */}
                      <TableCell
                        className={isBlocked ? "opacity-50" : "opacity-100"}
                      >
                        {item.email}
                      </TableCell>
                      {/* Last Active */}
                      <TableCell
                        className={isBlocked ? "opacity-50" : "opacity-100"}
                      >
                        {item.last_active}
                      </TableCell>
                      {/* Action */}
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          {/* Edit Dialog */}
                          <Dialog
                            open={!!selectedUser && selectedUser.id === item.id}
                            onOpenChange={(open) =>
                              !open
                                ? setSelectedUser(null)
                                : setSelectedUser(item)
                            }
                          >
                            <DialogTrigger asChild>
                              <button
                                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Edit"
                                onClick={() => setSelectedUser(item)}
                                disabled={isBlocked}
                                
                              >
                                <Edit />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="p-0">
                              <DialogHeader className="border-b border-gray-300">
                                <DialogTitle className="p-4">
                                  Change user subscription status
                                </DialogTitle>
                              </DialogHeader>
                              <div className="flex items-center gap-2 p-6">
                                <Image
                                  src={
                                    item.user.avatar || "/default-avatar.png"
                                  }
                                  alt={item.user.username}
                                  height={32}
                                  width={32}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="font-medium">
                                  {item.user.username}
                                </div>
                                <div
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    item.subscription.text === "Premium"
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {item.subscription.text}
                                </div>
                              </div>
                              <div className="px-6 pt-4 pb-6">
                                <form className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="status">Duration</Label>
                                    <Select
                                      onValueChange={setDuration}
                                      value={duration}
                                    >
                                      <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1h">
                                          1 Hour
                                        </SelectItem>
                                        <SelectItem value="6h">
                                          6 Hours
                                        </SelectItem>
                                        <SelectItem value="12h">
                                          12 Hours
                                        </SelectItem>
                                        <SelectItem value="24h">
                                          1 Day
                                        </SelectItem>
                                        <SelectItem value="3d">
                                          3 Days
                                        </SelectItem>
                                        <SelectItem value="7d">
                                          7 Days
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </form>
                              </div>
                              <DialogFooter className="p-4">
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedUser(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="orange"
                                  onClick={() =>
                                    handleEdit(selectedUser?.id, duration)
                                  }
                                  disabled={isEditing}
                                >
                                  Activate
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={!!bannedUser && bannedUser.id === item.id}
                            onOpenChange={(open) =>
                              !open ? setBannedUser(null) : setBannedUser(item)
                            }
                          >
                            <DialogTrigger asChild>
                              <button
                                className="p-2 hover:bg-gray-100 rounded"
                                title={isBlocked ? "Unban" : "Ban"}
                                onClick={() => setBannedUser(item)}
                              >
                                {isBlocked ? <Block /> : <CheckCircle />}
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {isBlocked
                                    ? "Unban Confirmation"
                                    : "Ban Confirmation"}
                                </DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to{" "}
                                  {isBlocked ? "unban" : "ban"}{" "}
                                  <span className="font-semibold text-red-600">
                                    {item?.user.username}
                                  </span>
                                  ? <br /> This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              {/* Show the duration input only when banning */}
                              {!isBlocked && (
                                <div className="px-6 pt-4 pb-6">
                                  <form className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="duration">
                                        Ban Duration
                                      </Label>
                                      <Select
                                        value={banDuration}
                                        onValueChange={setBanDuration}
                                      >
                                        <SelectTrigger id="duration">
                                          <SelectValue placeholder="Select Duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="1h">
                                            1 Hour
                                          </SelectItem>
                                          <SelectItem value="6h">
                                            6 Hours
                                          </SelectItem>
                                          <SelectItem value="12h">
                                            12 Hours
                                          </SelectItem>
                                          <SelectItem value="24h">
                                            1 Day
                                          </SelectItem>
                                          <SelectItem value="2d">
                                            2 Days
                                          </SelectItem>
                                          <SelectItem value="5d">
                                            5 Days
                                          </SelectItem>
                                          <SelectItem value="7d">
                                            7 Days
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </form>
                                </div>
                              )}
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setBannedUser(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="orange p-2 rounded-md"
                                  onClick={
                                    item.actions.can_ban === false
                                      ? handleUnbanUser(bannedUser?.id)
                                      : handleBannedUser(
                                          bannedUser?.id,
                                          banDuration
                                        )
                                  }
                                  disabled={isBlocked ? isBanning : isUnbanning}
                                >
                                  {isBlocked ? "Unban" : "Ban"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete Dialog */}
                          <Dialog
                            open={!!deleteUser && deleteUser.id === item.id}
                            onOpenChange={(open) =>
                              !open ? setDeleteUser(null) : setDeleteUser(item)
                            }
                          >
                            <DialogTrigger asChild>
                              <button
                                className="p-2 hover:bg-gray-100 rounded"
                                title="Delete"
                                onClick={() => setDeleteUser(item)}
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
                                    {deleteUser?.user.username}
                                  </span>
                                  ? <br /> This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setDeleteUser(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="orange p-2 rounded-md"
                                  onClick={() => handleDelete(deleteUser?.id)}
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
                  );
                })}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center md:justify-between md:flex-row flex-col mt-4">
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
