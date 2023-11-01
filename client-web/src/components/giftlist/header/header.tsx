import cat from "@/assets/cat.jpg";
import { useHeader } from "@/lib/providers/header.provider";
import { CONTAINER_LAYOUT } from "@/lib/styles";
import { User } from "@/lib/types/types";
import { cn } from "@/lib/utils";

import { GButton } from "../button/button";
import { MobileMenu } from "../menu/menu";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Logo } from "./logo/logo";
import { GNavigationMenu } from "./navigation-menu/navigation-menu";
import { UserDropdown } from "./user-dropdown/user-dropdown";

export interface HeaderProps {
  loggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
  const user: User = {
    img: cat,
    imgAlt: "Profile picture",
    firstName: "Cat",
    lastName: "Erpilar",
  };

  const { isFixed, showNavigation } = useHeader();

  return (
    <header
      className={cn(
        "bg-background",
        CONTAINER_LAYOUT,
        "py-2",
        "flex items-center justify-between",
        isFixed ? "fixed top-0 left-0 right-0" : ""
      )}
    >
      <Logo />
      {loggedIn ? (
        <>
          <div
            className={cn(
              "hidden md:block transition-all duration-300 transform",
              !showNavigation && "translate-y-2 opacity-0",
              showNavigation && "translate-y-0 opacity-1"
            )}
          >
            <GNavigationMenu />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserDropdown user={user} />
            <MobileMenu />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <GButton>Connexion</GButton>
        </div>
      )}
    </header>
  );
};

export { Header };
