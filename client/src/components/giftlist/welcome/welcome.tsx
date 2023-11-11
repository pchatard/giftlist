import { FC } from "react";

import { Transition } from "@headlessui/react";

import { Title } from "../title/title";

interface WelcomeProps {
  show: boolean;
  onBackButton: () => void;
}
export const Welcome: FC<WelcomeProps> = ({ show, onBackButton }) => {
  return (
    <Transition
      appear
      show={show}
      className="h-full"
      enter="transform transition-opacity ease-in duration-700"
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
