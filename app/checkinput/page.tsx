// "use client";

// import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
// import {
//   Button,
//   Group,
//   Input,
//   Label,
//   NumberField,
// } from "react-aria-components";

// export default function Component() {
//   return (
//     <NumberField defaultValue={99}>
//       <div className="*:not-first:mt-2 max-w-[200px]">
//         <Label className="text-foreground text-sm font-medium">
//           Number input with chevrons
//         </Label>
//         <Group className="flex border">
//           <Input className=" px-3 py-2 tabular-nums focus:outline-none focus:border-none active:outline-none active:border-none" />
//           <div className="flex h-[calc(100%+2px)] flex-col float-left">
//             <Button slot="increment" className="">
//               <ChevronUpIcon size={24} aria-hidden="true" fill="black" />
//             </Button>
//             <Button slot="decrement" className="">
//               <ChevronDownIcon size={24} aria-hidden="true" fill="black" />
//             </Button>
//           </div>
//         </Group>
//       </div>
//     </NumberField>
//   );
// }
"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [counters, setCounters] = useState([0, 0, 0]);

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

  const CounterBox = (index: number, label: string) => (
    <div key={index} className="flex flex-col gap-1">
      <label
        htmlFor={`custom-input-${index}`}
        className="text-sm font-medium pt select-none"
      >
        {label}
      </label>
      <div className="flex border w-fit">
        <input
          id={`custom-input-${index}`}
          type="text"
          className="focus:outline-none w-14 text-center"
          value={counters[index]}
          onChange={(e) => handleChange(index, e.target.value)}
        />
        <div className="flex flex-col ml-1">
          <button onClick={() => increment(index)}>
            <ChevronUpIcon size={24} aria-hidden="true" fill="black" />
          </button>
          <button onClick={() => decrement(index)}>
            <ChevronDownIcon size={24} aria-hidden="true" fill="black" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 mt-2">
      {/* Day */}
      {CounterBox(0, "Day")}

      {/* Hour + Minute together (no gap) */}
      <div className="flex">
        {CounterBox(1, "Hour")}
        {CounterBox(2, "Minute")}
      </div>
    </div>
  );
}
