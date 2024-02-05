import { RegisterForm } from "@/components/auth/register-form";
import { UserRole } from "@prisma/client";

const RegisterPage = () => {
  return <RegisterForm role={UserRole.USER} />;
};

export default RegisterPage;
