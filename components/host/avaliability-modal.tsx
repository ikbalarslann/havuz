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

export function Modal({ Trigger, property, title }: any) {
  const [formData, setFormData] = useState({
    id: property.id,
    price: property.price,
    free: property.free,
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
            <DialogDescription>{property.id}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 gap-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                defaultValue={property.price}
                onChange={handleChange}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="free">Free</Label>
              <Input
                id="free"
                defaultValue={property.free}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start flex">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" variant="default">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
