import giftlistLogo from "/giftlist.svg";

import cat from "@/assets/cat.jpg";
import { User } from "@/lib/types/types";
import { cn } from "@/lib/utils";

import { GButton } from "../button/button";
import { MobileMenu } from "../menu/menu";
import GNavigationMenu from "./navigation-menu/navigation-menu";
import UserDropdown from "./user-dropdown/user-dropdown";

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
        "w-full flex items-center justify-between px-4 py-4",
        fixed ? "fixed top-0 left-0 right-0" : ""
      )}
    >
      <img alt="Giftlist Logo" src={giftlistLogo} />
      {loggedIn ? (
        <>
          {navigation && (
            <div className="hidden md:block">
              <GNavigationMenu />
            </div>
          )}
          <div className="flex items-center gap-4">
            <UserDropdown user={user} />
            <MobileMenu />
          </div>
        </>
      ) : (
        <GButton>Connexion</GButton>
      )}
    </header>
  );
};

export { Header };
