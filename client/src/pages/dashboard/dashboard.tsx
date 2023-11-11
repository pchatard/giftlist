import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { FormUsername } from "@/components/giftlist/form-username/form-username";
import { Welcome } from "@/components/giftlist/welcome/welcome";

export const DashboardPage = () => {
  const { hasUsername } = useLoaderData() as { hasUsername: boolean };
  const [showWelcome, setShowWelcome] = useState(false);

  return (
    <div className="h-[calc(100vh-58px-24px)] overflow-auto">
      <FormUsername
        show={!hasUsername}
        onDisappear={() => {
          setShowWelcome(true);
        }}
      />

      <Welcome
        show={showWelcome}
        onBackButton={() => setShowWelcome(!showWelcome)}
      />
    </div>
  );
};
