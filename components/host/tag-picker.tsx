"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

const frameworks = [
  {
    value: "indoor-pool",
    label: "Indoor Pool",
  },
  {
    value: "outdoor-pool",
    label: "Outdoor Pool",
  },
  {
    value: "turkish-bath",
    label: "Turkish Bath",
  },
  {
    value: "jacuzzi",
    label: "Jacuzzi",
  },
  {
    value: "toilet",
    label: "Toilet",
  },
  {
    value: "shower",
    label: "Shower",
  },
  {
    value: "sauna",
    label: "Sauna",
  },
  {
    value: "steam-room",
    label: "Steam Room",
  },
  {
    value: "massage",
    label: "Massage",
  },
  {
    value: "gym",
    label: "Gym",
  },
  {
    value: "body-scrub",
    label: "Body Scrub",
  },
];

export function TagPicker({ setType, tags }: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (value !== "") {
      setType(value);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {"Select Tags"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    tags.includes(framework.value) ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
