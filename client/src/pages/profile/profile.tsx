import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useHeader } from "@/lib/providers/header.provider";

export const ProfilePage = () => {
  const { options, setOptions } = useHeader();

  useEffect(() => {
    setOptions({
      ...options,
      show: true,
      showNavigation: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOptions]);

  return (
    <div>
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};
