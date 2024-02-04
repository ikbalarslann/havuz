"use client";
import { Button } from "@/components/ui/button";
import { UpdateStatus } from "@/actions/booking-status";

const ApproveButton = ({ bookingId }: any) => {
  const handleApprove = async () => {
    await UpdateStatus({ bookingId });

    window.location.reload();
  };
  return <Button onClick={handleApprove}>Approve</Button>;
};

export default ApproveButton;
