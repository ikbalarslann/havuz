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
  const [inputs, setInputs] = useState({} as any);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    setInputs({
      bookingId: bookingId,
      propertyId: propertyId,
      rating: formData.rating,
      title: formData.title,
      description: formData.description,
    });
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await createReview(inputs);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
