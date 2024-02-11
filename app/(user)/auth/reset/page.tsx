import { ResetForm } from "@/components/auth/reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset",
  description: "Reset your password for renting the best pools in Istanbul.",
};

const ResetPage = () => {
  return <ResetForm />;
};

export default ResetPage;
