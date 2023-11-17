import { FC, useEffect, useState } from "react";

import { Transition } from "@headlessui/react";

import { Title } from "../title/title";

interface WelcomeProps {
  show: boolean;
}
export const Welcome: FC<WelcomeProps> = ({ show }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (show) {
      setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <Transition
      appear
      show={showWelcome}
      className="h-full"
      enter="transform transition-opacity ease-in duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leave="transform transition-opacity duration-300"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
    >
      <div className="h-full grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Title variant="h2">Bienvenue Patrick !</Title>
        </div>
      </div>
    </Transition>
  );
};
