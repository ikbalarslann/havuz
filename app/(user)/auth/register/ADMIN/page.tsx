import { RegisterForm } from "@/components/auth/register-form";
import { UserRole } from "@prisma/client";

interface HostRegisterPageProps {
  role: UserRole;
}

const RegisterPage: React.FC<HostRegisterPageProps> = ({
  role = UserRole.ADMIN,
}) => {
  return <RegisterForm role={role} />;
};

export default RegisterPage;
