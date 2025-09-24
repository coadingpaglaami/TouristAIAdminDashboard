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
import { useEffect, useState } from "react";
import { useUserActivityQuery } from "@/services/api";

function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export const UserActivity = () => {
  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const perPage = 7;
    // ✅ Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(search, 300);
  const { data, isFetching } = useUserActivityQuery({
    page,
    limit: perPage,
    search: debouncedSearch,
    type: activity
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  return (
    <div className="w-full overflow-hidden max-md:max-w-screen ">
      <div className="flex flex-col gap-3 py-10 px-4">
        <div className="flex md:justify-between md:items-center gap-4 flex-col md:flex-row w-full ">
          <div className="*:not-first:mt-2 md:max-w-[400px] w-full ">
            <div className="relative">
              <Input
                className="peer ps-9 pe-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
                placeholder="Search..."
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="flex gap-2 md:items-center md:justify-end md:max-w-[320px] md:w-1/2 w-full ">
            <Select value={activity ?? "all"} onValueChange={(value) => {setActivity(value); setPage(1);}}>
              <SelectTrigger className="">
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
        <ActivityTable
          data={data?.results.results ?? []}
          count={data?.count ?? 0}
          isLoading={isFetching}
          page={page}
          setPage={setPage}
          perPage={perPage}
        />
      </div>
    </div>
  );
};
