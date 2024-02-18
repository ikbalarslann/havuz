"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoWarningOutline } from "react-icons/io5";

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
      <DialogContent className="rounded-md w-[350px]">
        <DialogHeader>
          <DialogTitle>{booking.propertyTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex  justify-between text-gray-500">
            <p className="text-sm">{booking.date}</p>
            <p> {booking.price.toFixed(1)}TL</p>
          </div>

          {booking.type === "gender-separated" ? (
            <div className="bg-amber-100 p-3 rounded-md gap-3 flex ">
              <IoWarningOutline className="text-amber-600 w-6 h-6 " />
              <p className="text-gray-700 text-sm ">
                Check In time can change depends on the genders
              </p>
            </div>
          ) : (
            <div className="flex justify-between">
              <p className="text-gray-500">Check-in: {booking.checkIn}</p>
              <p className="text-gray-500">Check-out: {booking.checkOut}</p>
            </div>
          )}
          <Button
            className=" text-xl font-bold mb-2 bg-cyan-500 text-white shadow-none w-full"
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
