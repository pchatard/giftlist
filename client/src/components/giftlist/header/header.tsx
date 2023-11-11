// import cat from "@/images/cat.jpg";
import { useHeader } from "@/lib/providers/header.provider";
import { CONTAINER_LAYOUT } from "@/lib/styles";
import { User } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";

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
    // img: cat,
    imgAlt: "Profile picture",
    firstName: "Cat",
    lastName: "Erpilar",
  };

  const { options } = useHeader();

  return (
    <Transition
      appear
      as="header"
      className={cn(
        "bg-background",
        CONTAINER_LAYOUT,
        "py-2",
        "flex items-center justify-between",
        options.fixed ? "fixed top-0 left-0 right-0 z-10" : ""
      )}
      show={options.show}
      enter={"transition-all duration-300 transform"}
      enterFrom={"-translate-y-full"}
      enterTo={"translate-y-0"}
      leave={"transition-all duration-200 transform"}
      leaveFrom={"translate-y-0"}
      leaveTo={"-translate-y-full"}
    >
      <Logo />
      {loggedIn ? (
        <>
          <Transition
            show={options.showNavigation}
            enter="transition-all duration-300 transform"
            enterFrom="translate-y-2 opacity-0"
            enterTo="translate-y-0 opacity-1"
            leave="transition-all duration-300 transform"
            leaveFrom="translate-y-0 opacity-1"
            leaveTo="translate-y-2 opacity-0"
          >
            <GNavigationMenu />
          </Transition>

          <div className="flex items-center gap-4">
            {options.showTheme && <ThemeToggle />}
            {options.showUser && <UserDropdown user={user} />}
            <MobileMenu />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <Transition
            show={options.showLoginButton}
            enter="transition-all duration-500 transform"
            enterFrom="translate-y-[calc(100%)] opacity-0"
            enterTo="translate-y-0 opacity-1"
            leave="transition-all duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-[calc(200%)]"
          >
            <GButton>Connexion</GButton>
          </Transition>
          {options.showTheme && <ThemeToggle />}
        </div>
      )}
    </Transition>
  );
};

export { Header };
