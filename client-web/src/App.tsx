import "./App.css";

import { ChevronRight } from "lucide-react";

import { GButton } from "./components/giftlist/button";

function App() {
  return (
    <div className="flex gap-2">
      <GButton>Hello</GButton>
      <GButton icon={<ChevronRight />}>Hello</GButton>
    </div>
  );
}

export default App;
