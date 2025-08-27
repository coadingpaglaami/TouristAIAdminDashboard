import { Add } from "@/svg/Action";
import { SubscriptionPlan } from "./SubscriptionPlan";
import { PopularPlan } from "./PopulerPlan";
import { UserEarning } from "./UserEarning";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectNative } from "@/components/ui/select-native";
import { useId } from "react";

export const Subscription = () => {
  const id = useId();
  return (
    <div className="py-6 px-4 ">
      {/* <button className="orange p-3 rounded-md  flex items-center  gap-2 float-right mb-4">
        <Add />{" "}
        <span className="text-[16px] text-white tracking-wider font-light">
          Add New Plan
        </span>
      </button> */}
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="orange p-3 rounded-md  flex items-center  gap-2 float-right mb-4">
              {" "}
              <Add />{" "}
              <span className="text-[16px] text-white tracking-wider font-light">
                Add New Plan
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0">
            <DialogHeader className="border-b ">
              <DialogTitle className="text-[#1C1B1F] text-lg items-center p-4">
                Add new subscription plan
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 p-4">
              <div className="grid gap-3">
                <Label
                  htmlFor="name-1"
                  className="text-[#1C1B1F] text-sm font-normal tracking-wider"
                >
                  Plan name
                </Label>
                <Input
                  id="name-1"
                  name="name"
                  className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
                />
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="name-1"
                  className="text-[#1C1B1F] text-sm font-normal tracking-wider"
                >
                  Duration
                </Label>
                <Select defaultValue="1 hour">
                  <SelectTrigger>
                    1 hour
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-h-auto">
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="5 hours">5 hours</SelectItem>
                    <SelectItem value="9 hours">9 hours</SelectItem>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="2 days">2 days</SelectItem>
                    <SelectItem value="4 days">4 days</SelectItem>
                    <SelectItem value="9 days">9 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="*:not-first:mt-2">
                <Label
                  htmlFor={id}
                  className="text-[#1C1B1F] text-sm font-normal tracking-wider"
                >
                  Price
                </Label>
                <div className="flex rounded-md shadow-xs">
                  <Input
                    id={id}
                    className="-me-px rounded-e-none shadow-none focus-visible:z-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
                    placeholder="price"
                    type="text"
                  />
                  <SelectNative className="text-muted-foreground hover:text-foreground w-fit rounded-s-none shadow-none">
                    <option>HK Dollar</option>
                    <option>US Dollar</option>
                    <option>Euro</option>
                  </SelectNative>
                </div>
              </div>
            </div>
            <DialogFooter className="p-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border border-[#969696] text-[#969696] hover:bg-transparent hover:text-[#969696] hover:border-[#969696]"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button className="bg-[#FF7A00] p-3 rounded-md text-white hover:bg-[#FF7A00]">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <div className="flex md:flex-row flex-col gap-4 w-full mt-10">
        <div className="md:w-[65%] ">
          <SubscriptionPlan />
        </div>
        <div className="md:w-[35%]">
          <PopularPlan />
        </div>
      </div>
      <UserEarning />
    </div>
  );
};
