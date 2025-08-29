'use client';
import { useState } from "react";
import { SearchIcon } from "@/svg/Action";
import { PaymentTable } from "./PaymentTable";
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

export const PaymentRecord = () => {
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-8 py-10 px-4 max-md:max-w-screen overflow-hidden">
      <div className="flex md:justify-between md:items-center md:flex-row flex-col gap-4">
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
            <Select value={duration ?? "all"} onValueChange={setDuration}>
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
            
              <SelectGroup>
                  <SelectLabel>Subscription</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="2 days">2 days</SelectItem>
              <SelectItem value="3 days">3 days</SelectItem>
              <SelectItem value="5 days">5 days</SelectItem>
              <SelectItem value="7 days">7 days</SelectItem>
              <SelectItem value="9 days">9 days</SelectItem>
              </SelectGroup>
            </SelectContent>
            </Select>
        </div>
      </div>
      <PaymentTable search={search} duration={duration}  />
    </div>
  );
};
