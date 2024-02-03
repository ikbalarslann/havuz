import { Nav } from "./_components/nav";
import Footer from "@/components/user/footer";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-auto min-h-full w-full flex flex-col gap-y-10 items-center pb-0 mb-0  bg-blue-400">
      <Nav />
      <div className="mb-16">{children}</div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
