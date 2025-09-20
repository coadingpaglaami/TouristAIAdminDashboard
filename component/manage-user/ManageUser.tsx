"use client";
import { SearchIcon } from "@/svg/Action";
import { UserTable } from "./UserTable";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useManageUserQuery } from "@/services/api";

function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export const ManageUser = () => {
  const [search, setSearch] = useState("");
  const [subscription, setSubscription] = useState<string>("all");
  const [banned, setBanned] = useState<boolean | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 7;
  const debouncedSearch = useDebounce(search, 300);
  const { data, isFetching  } = useManageUserQuery({
    limit: perPage,
    page,
    search: debouncedSearch,
    banned: banned === null ? undefined : banned,
    subscription,
  });
  const handleSearchChange = (value: string) => {
    setSearch(value);

    setPage(1);
  };
  const handleSubscriptionChange = (value: string) => {
    setSubscription(value);

    setPage(1);
  };
  // --- Reset manual loading once API finishes ---

  const loadingState = isFetching ;

  return (
    <div className="flex flex-col gap-8 py-10 px-4 max-lg:max-w-screen overflow-hidden">
      <div className="flex lg:justify-between lg:items-center gap-4 flex-col lg:flex-row w-full">
        <div className="*:not-first:mt-2 max-w-[400px] w-full">
          <div className="relative">
            <Input
              className="peer ps-9 pe-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
              placeholder="Search..."
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center max-w-[320px] w-full ">
          <Select value={subscription} onValueChange={handleSubscriptionChange}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Subscription" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subscription</SelectLabel>
                <SelectItem value="all">All Subscription</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={banned === null ? "null" : banned ? "true" : "false"}
            onValueChange={(val) => {
              setPage(1);
              setBanned(val === "null" ? null : val === "true");
             
            }}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="null">All Users</SelectItem>
                <SelectItem value="true">Banned</SelectItem>
                <SelectItem value="false">Unbanned</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <UserTable
        data={data?.results.results ?? []}
        count={data?.count ?? 0}
        isLoading={loadingState}
        page={page}
        setPage={setPage}
        perPage={perPage}
      />
    </div>
  );
};
