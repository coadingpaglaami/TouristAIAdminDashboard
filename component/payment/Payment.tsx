"use client";
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
import { useBoosterRecordQuery, useBoostShowQuery } from "@/services/api";

export const PaymentRecord = () => {
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 7;
  const { data, isFetching } = useBoosterRecordQuery({ limit, page, search });
  const { data: boostData } = useBoostShowQuery({
    page,
    limit
  });
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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
                {boostData?.results.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <PaymentTable
        data={data?.results.results || []}
        count={data?.count || 0}
        isLoading={isFetching}
        page={page}
        setPage={setPage}
        perPage={limit}
      />
    </div>
  );
};
