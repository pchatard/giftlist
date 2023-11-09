import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Text } from "@/components/giftlist/text/text";
import { Title } from "@/components/giftlist/title/title";
import { Button } from "@/components/ui/button";
import arrowDark from "@/images/Arrow-dark.svg";
import arrowLight from "@/images/Arrow-light.svg";
import crying from "@/images/crying.webp";
import { useHeader } from "@/lib/providers/header.provider";
import { GRID } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";

export const LandingPage = () => {
  const navigate = useNavigate();

  const { options, setOptions } = useHeader();
  const [showHeroSection, setShowHeroSection] = useState(true);

  const featuresSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOptions({
      ...options,
      show: true,
      showNavigation: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOptions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (element) => {
        if (element[0].isIntersecting) {
          setOptions({
            ...options,
            showLoginButton: true,
          });
        } else {
          setOptions({
            ...options,
            showLoginButton: false,
          });
        }
      },
      {
        root: null,
        threshold: 0.95,
      }
    );

    const section = featuresSection?.current;

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOptions]);

  return (
    <div className="flex flex-col">
      <section
        className={cn(
          GRID,
          "h-[calc(100vh-58px-58px)] pb-6 mb-6 overflow-auto"
        )}
      >
        <Transition
          as="div"
          appear
          show={showHeroSection}
          className="col-start-1 col-span-2 md:col-start-2 md:col-span-4 h-fit my-auto relative"
        >
          <Transition.Child
            enter="transition-all duration-500"
            enterFrom="transform opacity-0 translate-y-2"
            enterTo="transform opacity-1 translate-y-0"
            leave="transition-all duration-100"
            leaveFrom="opacity-1"
            leaveTo="opacity-0"
            unmount={false}
          >
            <img
              src={crying}
              alt="Crying Baby"
              className={`rounded-lg max-h-[50vh] md:max-h-none`}
            />
          </Transition.Child>
          <Transition.Child
            as="div"
            enter="absolute top-1/4 md:top-0 right-0 transform translate-x-32 transition-all duration-700 delay-500"
            enterFrom="opacity-0 transform md:translate-y-0"
            enterTo="opacity-1 transform md:-translate-y-2/3"
            entered="absolute top-1/4 md:top-0 right-0 transform translate-x-32"
            leave="transition-all duration-100 absolute top-1/4 md:top-0 right-0 transform translate-x-32"
            leaveFrom="opacity-1"
            leaveTo="opacity-0"
          >
            <div className="flex items-start flex-row gap-2 md:gap-4">
              <img
                src={arrowLight}
                alt="Arrow"
                className="translate-y-3 dark:hidden"
              />
              <img
                src={arrowDark}
                alt="Arrow"
                className="hidden translate-y-3 dark:inline-block"
              />
              <p className="transform -rotate-3 font-virgil">
                Fatigué(e) de ces réactions ?
              </p>
            </div>
          </Transition.Child>
        </Transition>

        <Transition
          appear
          show={showHeroSection}
          enter="col-start-1 col-span-full md:col-start-7 md:col-span-5 md:my-auto flex flex-col justify-center md:block transition-all duration-700 delay-1000"
          enterFrom="transform opacity-0 translate-y-2"
          enterTo="transform opacity-1 translate-y-0"
          entered="col-start-1 col-span-full md:col-start-7 md:col-span-5 md:my-auto flex flex-col justify-center md:block"
          leave="col-start-1 col-span-full md:col-start-7 md:col-span-5 md:my-auto flex flex-col justify-center md:block transition-all duration-100"
          leaveFrom="opacity-1"
          leaveTo="opacity-0"
          unmount={false}
        >
          <Title>GRUMO</Title>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente,
            perferendis eligendi voluptates ea suscipit illum, soluta rem facere
            id.
          </Text>
          <div className="mt-6 md:mt-12 flex flex-col items-center md:items-start gap-4">
            <Button asChild className="w-full md:w-auto">
              <Link
                to="/profile"
                onClick={(e) => {
                  e.preventDefault();
                  setShowHeroSection(!showHeroSection);

                  setTimeout(() => {
                    navigate("app");
                  }, 300);
                }}
              >
                Commencer
              </Link>
            </Button>
            <a
              href="#features"
              className="text-center mb-4 flex items-center gap-2 md:mb-0"
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
              <Text variant={"muted"}>Découvrir plus</Text>
            </a>
          </div>
        </Transition>
      </section>
      <section
        id="features"
        ref={featuresSection}
        className={cn(GRID, "h-[calc(100vh-58px-58px)] my-6 overflow-auto")}
      ></section>
    </div>
  );
};
