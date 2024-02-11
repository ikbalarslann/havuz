import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to rent best pools in Istanbul.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
