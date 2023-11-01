import cat from "@/assets/cat.jpg";
import { CONTAINER_LAYOUT } from "@/lib/styles";
import { User } from "@/lib/types/types";
import { cn } from "@/lib/utils";

import { GButton } from "../button/button";
import { MobileMenu } from "../menu/menu";
import { ModeToggle } from "../mode-toggle/mode-toggle";
import { Logo } from "./logo/logo";
import { GNavigationMenu } from "./navigation-menu/navigation-menu";
import { UserDropdown } from "./user-dropdown/user-dropdown";

export interface HeaderProps {
  loggedIn: boolean;
  navigation?: boolean;
  fixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  loggedIn,
  navigation = true,
  fixed = true,
}) => {
  const user: User = {
    img: cat,
    imgAlt: "Profile picture",
    firstName: "Cat",
    lastName: "Erpilar",
  };

  return (
    <header
      className={cn(
        "bg-background",
        CONTAINER_LAYOUT,
        "py-2",
        "flex items-center justify-between",
        fixed ? "fixed top-0 left-0 right-0" : ""
      )}
    >
      <Logo />
      {loggedIn ? (
        <>
          {navigation && (
            <div className="hidden md:block">
              <GNavigationMenu />
            </div>
          )}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserDropdown user={user} />
            <MobileMenu />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <ModeToggle />
          <GButton>Connexion</GButton>
        </div>
      )}
    </header>
  );
};

export { Header };
