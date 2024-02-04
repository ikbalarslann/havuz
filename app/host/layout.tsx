import { Sidebar } from "./_components/sidebar";
import { RoleGate } from "@/components/auth/role-gate";

interface ProtectedHostLayoutProps {
  children: React.ReactNode;
}

const ProtectedHostLayout = ({ children }: ProtectedHostLayoutProps) => {
  return (
    <div className="flex min-h-full ">
      <div className="w-auto ">
        <Sidebar />
      </div>
      <div className="flex-1   flex flex-col gap-y-10 items-center p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <RoleGate allowedRole="ADMIN">{children}</RoleGate>
      </div>
    </div>
  );
};

export default ProtectedHostLayout;
