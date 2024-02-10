"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  trigger: any;
  booking: any;
}

const Modal = ({ trigger, booking }: ModalProps) => {
  const openNewTab = () => {
    window.open(booking.location, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-blue-300 rounded-md w-[350px]">
        <DialogHeader>
          <DialogTitle>{booking.propertyTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex  gap-4 text-blue-950">
            <p>{booking.date}</p>
            <p> {booking.price.toFixed(1)}TL</p>
          </div>

          <div className="flex gap-4">
            <p className="text-blue-900">Check-in: {booking.checkIn}</p>
            <p className="text-blue-900">Check-out: {booking.checkOut}</p>
          </div>
          <Button
            className=" text-xl font-bold mb-2 bg-blue-200 text-blue-900 shadow-none w-full"
            onClick={openNewTab}
          >
            Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
