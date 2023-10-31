import { LogOut, User as UserIcon } from "lucide-react";
import { FC } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types/types";
import { cn } from "@/lib/utils";

import GAvatar from "../../avatar/avatar";

export interface UserDropdownProps {
  user: User;
}

const UserDropdown: FC<UserDropdownProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-2 outline-none focus-visible:ring-transparent md:py-2"
        )}
      >
        <GAvatar
          img={user.img}
          imgAlt={user.imgAlt}
          fallback={
            user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
          }
        />
        <span>
          {user.firstName} {user.lastName}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-36 md:w-52 md:mr-2">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="h-4 w-4 mr-2" />
            <span>Mon compte</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-destructive bg-destructive-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
