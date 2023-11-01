import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useHeader } from "@/lib/providers/header.provider";

export const ProfilePage = () => {
  const { setShowNavigation } = useHeader();

  useEffect(() => {
    setShowNavigation(true);
  }, [setShowNavigation]);

  return (
    <div>
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};
