"use client";
import { SearchIcon } from "@/svg/Action";
import { UserTable } from "./UserTable";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ManageUser = () => {
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState<string>("all");
  const [banned, setBanned] = useState<string>("all");

  return (
    <div className="flex flex-col gap-8 py-10 px-4 max-md:max-w-screen overflow-hidden">
      <div className="flex md:justify-between md:items-center gap-4 flex-col md:flex-row w-full">
        <div className="*:not-first:mt-2 max-w-[400px] w-full">
          <div className="relative">
            <Input
              className="peer ps-9 pe-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
              placeholder="Search..."
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center max-w-[320px] w-full ">
          <Select value={subscription} onValueChange={setSubscription}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Subscription" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subscription</SelectLabel>
                <SelectItem value="all">All Subscription</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={banned} onValueChange={setBanned}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All User</SelectItem>
                <SelectItem value="Banned">Block</SelectItem>
                <SelectItem value="Unbanned">Unblock</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <UserTable
        search={search}
        subscriptionFilter={subscription}
        bannedFilter={banned}
      />
    </div>
  );
};
