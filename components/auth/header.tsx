import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold")}>
        <Image src="/logo.png" alt="Logo" width={150} height={50} />
      </h1>
      <p className="text-muted-foreground text-xl">{label}</p>
    </div>
  );
};
