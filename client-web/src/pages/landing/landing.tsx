import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useHeader } from "@/lib/providers/header.provider";

export const LandingPage = () => {
  const { setShowNavigation } = useHeader();

  useEffect(() => {
    setShowNavigation(false);
  }, [setShowNavigation]);

  return (
    <div>
      <Button asChild>
        <Link to="/profile">Profile</Link>
      </Button>
    </div>
  );
};
