import { User, Users } from "lucide-react";
import { FC } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export interface GNavigationMenuProps {}

export const GNavigationMenu: FC<GNavigationMenuProps> = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Accueil
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <User className="w-4 h-4 mr-2" />
            Moi
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li>
                <NavigationMenuLink>Mes listes</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Créer une liste</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Mes cadeaux</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Créer un cadeau</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Users className="w-4 h-4 mr-2" />
            Mes amis
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li>
                <NavigationMenuLink>Listes de mes amis</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Code de partage</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink>Dernièrement visité</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
