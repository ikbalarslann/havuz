import Payment from "@/components/user/payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "Pay for your bookings to access the best pools in Istanbul.",
};

const PaymentPage = () => {
  return <Payment />;
};

export default PaymentPage;
