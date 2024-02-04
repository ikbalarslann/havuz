"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UpdatePropertyAvailability } from "@/actions/availability";

export function Modal({ Trigger, availabilityItem, title }: any) {
  const [formData, setFormData] = useState({
    date: availabilityItem.date,
    price: availabilityItem.price,
    free: availabilityItem.free,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await UpdatePropertyAvailability({ title, values: formData });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Availability</DialogTitle>
            <DialogDescription>{availabilityItem.date}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 gap-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                defaultValue={availabilityItem.price}
                onChange={handleChange}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="free">Free</Label>
              <Input
                id="free"
                defaultValue={availabilityItem.free}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start flex">
            <Button type="submit" variant="default" className="mt-4">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
