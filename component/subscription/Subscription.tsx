"use client";
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
import { Checkbox } from "@/components/ui/checkbox";
import { SelectNative } from "@/components/ui/select-native";
import { useId, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { BoosterProps, useBoostCreateMutation } from "@/services/api";
import { toast } from "sonner";

export const Subscription = () => {
  const id = useId();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("HKD");
  const [counters, setCounters] = useState([0, 0, 0]);
  const [isLifetime, setIsLifetime] = useState(false);
  const [createPlan, { isLoading }] = useBoostCreateMutation();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleChange = (index: number, value: string) => {
    const num = Number(value.replace(/\D/g, "")); // only digits
    setCounters((prev) => {
      const updated = [...prev];
      if (index === 1) {
        // Hour (0–23)
        updated[index] = Math.min(Math.max(num, 0), 23);
      } else if (index === 2) {
        // Minute (0–59)
        updated[index] = Math.min(Math.max(num, 0), 59);
      } else {
        // Day (no max)
        updated[index] = num;
      }
      return updated;
    });
  };

  // Increment with rollover logic
  const increment = (index: number) => {
    setCounters((prev) => {
      const updated = [...prev];
      if (index === 2) {
        if (updated[2] >= 59) {
          updated[2] = 0;
          updated[1] = (updated[1] + 1) % 24;
          if (updated[1] === 0) updated[0] += 1;
        } else {
          updated[2] += 1;
        }
      } else if (index === 1) {
        if (updated[1] >= 23) {
          updated[1] = 0;
          updated[0] += 1;
        } else {
          updated[1] += 1;
        }
      } else {
        updated[0] += 1;
      }
      return updated;
    });
  };

  // Decrement with rollover logic
  const decrement = (index: number) => {
    setCounters((prev) => {
      const updated = [...prev];
      if (index === 2) {
        if (updated[2] <= 0) {
          updated[2] = 59;
          if (updated[1] > 0) {
            updated[1] -= 1;
          } else {
            updated[1] = 23;
            if (updated[0] > 0) updated[0] -= 1;
          }
        } else {
          updated[2] -= 1;
        }
      } else if (index === 1) {
        if (updated[1] <= 0) {
          updated[1] = 23;
          if (updated[0] > 0) updated[0] -= 1;
        } else {
          updated[1] -= 1;
        }
      } else {
        updated[0] = Math.max(0, updated[0] - 1);
      }
      return updated;
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: BoosterProps = {
      name,
      price: Number(price),
      duration: isLifetime
        ? "lifetime"
        : (`${counters[0]} ${counters[1]} ${counters[2]}` as `${number} ${number} ${number}`),
      currency: currency.toLowerCase(),
      description,
    };

    console.log("Payload:", payload);
    try {
      await createPlan(payload).unwrap();
      setOpen(false);
      // Reset form
      setName("");
      setPrice("");
      setCurrency("HKD");
      setCounters([0, 0, 0]);
      setIsLifetime(false);
      toast.success("Plan created successfully!", {
        richColors: true,
      });
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  };

  const CounterBox = (index: number, label: string) => (
    <div key={index} className="flex flex-col gap-1">
      <label
        htmlFor={`custom-input-${index}`}
        className="text-xs pt select-none"
      >
        {label}
      </label>
      <div className="flex border border-[#D9D9D9]  w-fit">
        <input
          id={`custom-input-${index}`}
          type="text"
          className="focus:outline-none w-10 text-center"
          value={counters[index]}
          onChange={(e) => handleChange(index, e.target.value)}
        />
        <div className="flex flex-col ml-1">
          <button onClick={() => increment(index)}>
            <ChevronUpIcon size={16} aria-hidden="true" fill="black" />
          </button>
          <button onClick={() => decrement(index)}>
            <ChevronDownIcon size={16} aria-hidden="true" fill="black" />
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="py-6 px-4 max-w-screen overflow-hidden">
      {/* <button className="orange p-3 rounded-md  flex items-center  gap-2 float-right mb-4">
        <Add />{" "}
        <span className="text-[16px] text-white tracking-wider font-light">
          Add New Plan
        </span>
      </button> */}
      <Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSubmit}>
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
                  id="plan-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-3 items-center justify-between">
                <div className=" grid ">
                  <Label
                    htmlFor="name-1"
                    className="text-[#1C1B1F] text-sm font-normal tracking-wider"
                  >
                    Duration
                  </Label>

                  <div
                    className={`max-w-[60%] w-full flex gap-4 mt-2 ${
                      isLifetime
                        ? "opacity-50 pointer-events-none cursor-not-allowed select-none"
                        : ""
                    }`}
                  >
                    {/* Day */}
                    {CounterBox(0, "Day")}

                    {/* Hour + Minute together (no gap) */}
                    <div className="flex">
                      {CounterBox(1, "Hour")}
                      {CounterBox(2, "Minute")}
                    </div>
                  </div>
                </div>
                <div
                  className="max-w-[40%] w-full mt-12 flex items-center gap-2 border p-2.5
  [--primary:#FF7A00] 
  [--ring:#FFB366] 
  in-[.dark]:[--primary:#FF7A00] 
  in-[.dark]:[--ring:#CC6600]"
                >
                  <Checkbox
                    id={id}
                    checked={isLifetime}
                    onCheckedChange={(checked) => setIsLifetime(!!checked)}
                  />
                  <Label htmlFor={id}>LifeTime</Label>
                </div>
              </div>
              <div>
                <Label
                  htmlFor="plan-description"
                  className="text-[#1C1B1F] text-sm font-normal tracking-wider"
                >
                  Description
                </Label>
                <Input
                  id="plan-description"
                  name="description"
                  placeholder="Enter plan description"
                  className="-me-px rounded-e-none shadow-none focus-visible:z-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
                  onChange={(e) => setDescription(e.target.value)}
                />
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
                    value={price}
                    className="-me-px rounded-e-none shadow-none focus-visible:z-10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
                    placeholder="price"
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <SelectNative
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="text-muted-foreground hover:text-foreground w-fit rounded-s-none shadow-none"
                  >
                    <option value="HKD">HK Dollar</option>
                    <option value="USD">US Dollar</option>
                    <option value="EUR">Euro</option>
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
              <Button
                className="bg-[#FF7A00] p-3 rounded-md text-white hover:bg-[#FF7A00] disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Activate
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
