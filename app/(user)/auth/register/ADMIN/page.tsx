import { RegisterForm } from "@/components/auth/register-form";
import { UserRole } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to your account to rent your pools in Istanbul.",
};

const RegisterPage = () => {
  return <RegisterForm role={UserRole.ADMIN} />;
};

export default RegisterPage;
