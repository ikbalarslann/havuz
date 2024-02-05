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
import { useState } from "react";
import { createReview } from "@/actions/create-review";
import { RatingPicker } from "./rating-picker";

export function Modal({ Trigger, bookingId, propertyId }) {
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    description: "",
  });

  const handleChange = (e) => {
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
      <DialogContent className="bg-blue-100 rounded-md mx-2 ">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 gap-5 flex-col ">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="rating">Rating</Label>
              <RatingPicker
                setRating={(value) =>
                  setFormData({ ...formData, rating: value })
                }
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="title">title</Label>
              <Input
                id="title"
                className="bg-white"
                defaultValue=""
                onChange={handleChange}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">description</Label>
              <Input
                id="description"
                className="bg-white"
                defaultValue=""
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end flex mt-3">
            <Button type="submit" variant="default">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
