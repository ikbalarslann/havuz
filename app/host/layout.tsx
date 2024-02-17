import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { RoleGate } from "@/components/auth/role-gate";

interface ProtectedHostLayoutProps {
  children: React.ReactNode;
}

const ProtectedHostLayout = ({ children }: ProtectedHostLayoutProps) => {
  return (
    <div className=" sm:flex sm:flex-row ">
      <Navbar className="sm:hidden" />
      <Sidebar className="hidden sm:flex " />
      <div className="flex-1 min-h-screen  h-full  flex flex-col gap-y-10 items-center p-10 ">
        <RoleGate allowedRole="ADMIN">{children}</RoleGate>
      </div>
    </div>
  );
};

export default ProtectedHostLayout;
