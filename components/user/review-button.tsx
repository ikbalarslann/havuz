"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "./review-modal";

const ReviewButton = ({ bookingId, propertyId }: any) => {
  return (
    <Modal
      Trigger={
        <Button className="w-full mt-3 bg-cyan-500 text-xl text-white">
          Review
        </Button>
      }
      bookingId={bookingId}
      propertyId={propertyId}
    />
  );
};

export default ReviewButton;
