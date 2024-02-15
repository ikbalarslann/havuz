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
  description: "Pool renting made easy.",
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-auto min-h-full w-full flex flex-col  items-center  ">
      <Nav />
      <div className="mb-16">{children}</div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
