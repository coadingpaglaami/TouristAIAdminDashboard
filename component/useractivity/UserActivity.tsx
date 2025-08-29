"use client";
import { SearchIcon } from "@/svg/Action";
import { ActivityTable } from "./ActivityTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const UserActivity = () => {
  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState<string | undefined>(undefined);
  return (
    <div className="w-full overflow-hidden max-md:max-w-screen ">
      <div className="flex flex-col gap-3 py-10 px-4">
        <div className="flex md:justify-between md:items-center gap-4 flex-col md:flex-row w-full ">
          <div className="*:not-first:mt-2 md:max-w-[400px] w-full ">
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
          <div className="flex gap-2 md:items-center md:justify-end md:max-w-[320px] md:w-1/2 w-full ">
            <Select value={activity ?? "all"} onValueChange={setActivity}>
              <SelectTrigger className="" >
                <SelectValue placeholder="Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Activity</SelectLabel>
                  <SelectItem value="all">All Activity</SelectItem>
                  <SelectItem value="Upload">Upload</SelectItem>
                  <SelectItem value="Clicked">Clicked</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
        </div>
        <ActivityTable search={search} activity={activity} />
      </div>
    </div>
  );
};
