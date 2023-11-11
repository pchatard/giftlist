import { FC } from "react";

import { Text } from "@/components/giftlist/text/text";
import { Title } from "@/components/giftlist/title/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsername } from "@/lib/hooks/useUsername";
import { Transition } from "@headlessui/react";

interface FormUsernameProps {
  show: boolean;
  onDisappear: () => void;
}

export const FormUsername: FC<FormUsernameProps> = ({ show, onDisappear }) => {
  const { showUserForm, onConfirm, onPass } = useUsername(show, onDisappear);

  // useEffect(() => {
  // const interval = setInterval(() => {
  //   setPlaceholder((placeholder) => placeholder + "a");
  // }, 100);
  // return () => clearInterval(interval);
  // }, []);

  return (
    <Transition
      appear
      show={showUserForm}
      className="h-full"
      enter="transition-opacity transform ease-in duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leave="transition-opacity transform duration-300"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
    >
      <div className="h-full px-2 grid place-items-center">
        <div className="flex flex-col items-center gap-8 box-border">
          <Title variant={"h4"} className="md:hidden text-left">
            Comment devons-nous t'appeler ?
          </Title>
          <Title variant={"h3"} className="hidden md:block text-left">
            Comment devons-nous t'appeler ?
          </Title>

          <div className="w-full flex flex-col items-center">
            <Input placeholder={"Henry4"} className="w-full md:w-3/4" />
            <Button className="mt-4 w-full md:w-3/4" onClick={onConfirm}>
              Continuer
            </Button>
          </div>

          <Button variant={"link"} onClick={onPass}>
            <Text variant={"muted"}>Passer</Text>
          </Button>
        </div>
      </div>
    </Transition>
  );
};
