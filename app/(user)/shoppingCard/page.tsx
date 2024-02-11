import ShoppingCard from "@/components/user/shoppingCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Card",
  description: "Review your bookings and proceed to payment.",
};

const ShoppingCardPage = () => {
  return <ShoppingCard />;
};

export default ShoppingCardPage;
