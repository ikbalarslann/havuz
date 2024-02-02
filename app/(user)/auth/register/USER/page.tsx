import { RegisterForm } from "@/components/auth/register-form";
import { UserRole } from "@prisma/client";

interface RegisterPageProps {
  role: UserRole;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  role = UserRole.USER,
}) => {
  return <RegisterForm role={role} />;
};

export default RegisterPage;
