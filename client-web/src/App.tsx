import { Header } from "./components/giftlist/header/header";
import { ThemeProvider } from "./lib/providers/theme-provider";
import { CONTAINER_LAYOUT } from "./lib/styles";
import { cn } from "./lib/utils";

function App() {
  return (
    <ThemeProvider storageKey="giftlist-ui-theme">
      <div className={cn("relative", CONTAINER_LAYOUT)}>
        <Header loggedIn={true} />
        <div className="mt-[58px] h-[calc(100vh-58px)]"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
