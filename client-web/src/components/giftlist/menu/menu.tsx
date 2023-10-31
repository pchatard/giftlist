import giftlistLogo from "/giftlist.svg";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface MobileMenuProps {
  // loggedIn: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer md:hidden">
        <Menu data-testid="trigger" />
      </SheetTrigger>
      <SheetContent side={"right"} className="w-5/6">
        <SheetHeader>
          <SheetTitle>
            <img alt="Giftlist Logo" src={giftlistLogo} />
          </SheetTitle>
        </SheetHeader>
        <div></div>
        <SheetFooter>{"Hello"}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
