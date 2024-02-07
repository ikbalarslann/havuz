"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  trigger: any;
  booking: any;
}

const Modal = ({ trigger, booking }: ModalProps) => {
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
            <p> {booking.price}TL</p>
          </div>

          <div className="flex gap-4">
            <p className="text-blue-900">Check-in: {booking.checkIn}</p>
            <p className="text-blue-900">Check-out: {booking.checkOut}</p>
          </div>

          <p className="text-blue-900">Address: {booking.location}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
