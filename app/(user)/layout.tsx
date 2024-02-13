import { Nav } from "./_components/nav";
import Footer from "@/components/user/footer";
import type { Metadata } from "next";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "Havuz ve Havuz",
    template: "%s | Havuz ve Havuz",
  },
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-auto min-h-full w-full flex flex-col px-2 items-center   bg-blue-400">
      <Nav />
      <div className="mb-16">{children}</div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
