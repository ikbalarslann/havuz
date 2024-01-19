import { Nav } from "./_components/nav";
import { RoleGate } from "@/components/auth/role-gate";

interface ProtectedHostLayoutProps {
  children: React.ReactNode;
}

const ProtectedHostLayout = ({ children }: ProtectedHostLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Nav />
      <RoleGate allowedRole="ADMIN">{children}</RoleGate>
    </div>
  );
};

export default ProtectedHostLayout;
