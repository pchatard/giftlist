import { Outlet } from "react-router-dom";

import { Header } from "@/components/giftlist/header/header";
import { HeaderProvider } from "@/lib/providers/header.provider";
import { ThemeProvider } from "@/lib/providers/theme.provider";
import { CONTAINER_LAYOUT } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  return (
    <ThemeProvider storageKey="giftlist-ui-theme">
      <HeaderProvider>
        <div className={cn("relative", CONTAINER_LAYOUT)}>
          <Header loggedIn={false} />
          <main className="mt-[58px] pt-6">
            <Outlet />
          </main>
        </div>
      </HeaderProvider>
    </ThemeProvider>
  );
};
