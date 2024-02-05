"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "./review-modal";

const ReviewButton = ({ bookingId, propertyId }: any) => {
  return (
    <div>
      <Modal
        Trigger={<Button>Review</Button>}
        bookingId={bookingId}
        propertyId={propertyId}
      />
    </div>
  );
};

export default ReviewButton;
