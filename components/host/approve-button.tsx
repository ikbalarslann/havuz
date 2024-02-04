"use client";
import { Button } from "@/components/ui/button";
import { UpdateStatus } from "@/actions/booking-status";

const ApproveButton = ({ bookingId, propertyId, date }: any) => {
  const handleApprove = async () => {
    await UpdateStatus({ bookingId, propertyId, date });

    window.location.reload();
  };
  return <Button onClick={handleApprove}>Approve</Button>;
};

export default ApproveButton;
