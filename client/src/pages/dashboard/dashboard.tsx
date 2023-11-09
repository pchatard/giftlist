import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { Text } from "@/components/giftlist/text/text";
import { Title } from "@/components/giftlist/title/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transition } from "@headlessui/react";

export const DashboardPage = () => {
  const { hasUsername } = useLoaderData() as { hasUsername: boolean };

  const [showUsernameForm, setShowUsernameForm] = useState(true);

  return (
    <Transition
      appear
      as="div"
      className="h-[calc(100vh-58px-24px)] overflow-auto"
      show={showUsernameForm}
      enter="transform duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leave="transform duration-100"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
    >
      {!hasUsername ? (
        <div className="h-full grid place-items-center">
          <div className="flex flex-col items-center gap-4">
            <Title variant={"h3"}>Comment devons-nous vous appeler ?</Title>
            <Input placeholder="Nom d'utilisateur" className="mt-4 w-3/4" />
            <Button
              className="w-3/4 mb-4"
              onClick={() => {
                setShowUsernameForm(false);
              }}
            >
              Continuer
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                setShowUsernameForm(false);
              }}
            >
              <Text variant={"muted"}>Passer</Text>
            </Button>
          </div>
        </div>
      ) : (
        "Non"
      )}
    </Transition>
  );
};
