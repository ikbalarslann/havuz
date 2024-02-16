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

interface ModalProps {
  Trigger: React.ReactNode;
  bookingId: string;
  propertyId: string;
}

export function Modal({ Trigger, bookingId, propertyId }: ModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [rating, setRating] = useState<string>("1");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const inputs = {
      bookingId: bookingId,
      propertyId: propertyId,
      rating: parseFloat(rating),
      title: formData.title,
      description: formData.description,
    };
    await createReview(inputs);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="bg-gray-100 rounded-md w-[350px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
          </DialogHeader>
          <div className="flex items-center  gap-4 flex-col my-3 text-center ">
            <div className=" flex flex-col gap-1 ">
              <Label htmlFor="rating" className="text-cyan-950">
                Rating
              </Label>
              <RatingPicker setRating={setRating} />
            </div>
            <div className=" ">
              <Label htmlFor="title" className="text-cyan-950">
                title
              </Label>
              <Input
                id="title"
                className="bg-white"
                defaultValue=""
                placeholder="I loved it!"
                onChange={handleChange}
              />
            </div>
            <div className="   ">
              <Label htmlFor="description" className="text-cyan-950">
                description
              </Label>
              <Input
                id="description"
                className="bg-white"
                defaultValue=""
                placeholder="It was great!"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter className=" flex  mt-4">
            <Button type="submit" className="bg-cyan-500 text-lg">
              Leave Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
