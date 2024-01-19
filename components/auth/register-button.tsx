"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RegisterForm } from "@/components/auth/register-form";
import { UserRole } from "@prisma/client";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  role: UserRole;
}

export const RegisterButton = ({
  children,
  mode = "modal",
  asChild,
  role,
}: RegisterButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/register");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <RegisterForm role={role} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
