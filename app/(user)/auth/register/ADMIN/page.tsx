import { RegisterForm } from "@/components/auth/register-form";
import { UserRole } from "@prisma/client";

const RegisterPage = ({ role = UserRole.ADMIN }: any) => {
  return <RegisterForm role={role} />;
};

export default RegisterPage;
