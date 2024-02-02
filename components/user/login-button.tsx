import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { UserRole } from "@prisma/client";

export function LoginButtonDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Login</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuGroup>
          <LoginButton asChild>
            <DropdownMenuItem>Login</DropdownMenuItem>
          </LoginButton>
          <RegisterButton role={UserRole.USER} asChild>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </RegisterButton>
          <RegisterButton role={UserRole.ADMIN} asChild>
            <DropdownMenuItem>Host Register</DropdownMenuItem>
          </RegisterButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
