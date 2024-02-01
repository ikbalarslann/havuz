"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { createReview } from "@/actions/create-review";

export function Modal({ Trigger, bookingId, propertyId }: any) {
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const inputs = {
      bookingId: bookingId,
      propertyId: propertyId,
      rating: parseInt(formData.rating),
      title: formData.title,
      description: formData.description,
    };
    await createReview(inputs);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 gap-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                type="number"
                id="rating"
                defaultValue="0"
                onChange={handleChange}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="title">title</Label>
              <Input id="title" defaultValue="" onChange={handleChange} />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">description</Label>
              <Input id="description" defaultValue="" onChange={handleChange} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start flex">
            <Button type="submit" variant="default">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
