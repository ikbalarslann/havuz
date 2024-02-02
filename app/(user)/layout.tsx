import { Nav } from "./_components/nav";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-auto min-h-full w-full flex flex-col gap-y-10 items-center  bg-blue-400">
      <Nav />
      {children}
    </div>
  );
};

export default ProtectedLayout;
