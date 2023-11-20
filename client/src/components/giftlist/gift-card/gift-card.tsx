import {
  CatIcon,
  CheckIcon,
  Edit2Icon,
  LinkIcon,
  ListIcon,
  StarIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Gift } from "@/lib/types/types";

import { Text } from "../text/text";

interface GiftCardProps {
  gift: Gift;
}

export const GiftCard: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, price, status, link } = gift;

  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="w-full flex flex-row gap-4">
        <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
          {image ? (
            <img
              src={image}
              alt=""
              className="my-auto aspect-square transition group-hover:scale-110"
            />
          ) : (
            <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
          )}
        </div>
        <div className="w-3/4 flex flex-col gap-1 pr-6">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{category}</CardDescription>
          <div className="mt-1 flex justify-between">
            <Text variant="normal">{price}</Text>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge variant={status === "Disponible" ? "default" : "secondary"}>
          {status}
        </Badge>
        <div className="flex gap-2">
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <Edit2Icon className="w-4" />
            </Button>
          )}
          {status && (
            <Button variant={"outline"} size={"icon"}>
              {status === "Disponible" ? (
                <CheckIcon className="w-4" />
              ) : (
                <XIcon className="w-4" />
              )}
            </Button>
          )}
          <Button variant={"outline"} size={"icon"} disabled={!link}>
            <LinkIcon className="w-4" />
          </Button>
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <TrashIcon className="w-4 text-destructive" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export const GiftCardVariant: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, price, status, link, isFavorite, isOwner } =
    gift;
  return (
    <Card className="flex flex-col relative group">
      {isFavorite && (
        <StarIcon className="z-index-10 absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2 w-6 bg-white" />
      )}
      <CardHeader className="p-4 w-full flex flex-row gap-4">
        <div className="w-1/4  aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
          {image ? (
            <img
              src={image}
              alt=""
              className="my-auto aspect-square transition group-hover:scale-110"
            />
          ) : (
            <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
          )}
        </div>
        <div className="w-3/4 flex flex-col gap-1">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{category}</CardDescription>

          <div className="mt-2 flex justify-between">
            {price && <Text variant="normal">{price}</Text>}
            <Badge variant={status === "Disponible" ? "default" : "secondary"}>
              {status}
            </Badge>
            {isOwner && (
              <div className="absolute bottom-0 right-0 mr-2 translate-y-2/3 z-20 flex gap-2 transform transition opacity-0 group-hover:opacity-100">
                {/* Opens Sheet (bottom on mobile, right on desktop) */}
                <Button variant={"outline"} size={"icon"}>
                  <Edit2Icon className="w-4" />
                </Button>

                {/* Opens new tab */}
                <Button variant={"outline"} size={"icon"} disabled={!link}>
                  <LinkIcon className="w-4" />
                </Button>

                {/* Opens dialog to confirm deletion */}
                <Button variant={"outline"} size={"icon"}>
                  <TrashIcon className="w-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {!isOwner && (
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Badge variant={status === "Disponible" ? "default" : "secondary"}>
            {status}
          </Badge>

          <div className="flex gap-2 transform transition opacity-0 group-hover:opacity-100">
            {/* Opens Sheet (bottom on mobile, right on desktop) */}
            {!status && (
              <Button variant={"outline"} size={"icon"}>
                <Edit2Icon className="w-4" />
              </Button>
            )}
            {/* Opens Dialog to confirm booking */}
            {status && (
              <Button variant={"outline"} size={"icon"}>
                {status === "Disponible" ? (
                  <CheckIcon className="w-4" />
                ) : (
                  <XIcon className="w-4" />
                )}
              </Button>
            )}
            {/* Opens new tab */}
            <Button variant={"outline"} size={"icon"} disabled={!link}>
              <LinkIcon className="w-4" />
            </Button>
            {/* Opens dialog to confirm deletion */}
            {!status && (
              <Button variant={"outline"} size={"icon"}>
                <TrashIcon className="w-4 text-destructive" />
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export const GiftCardVariantPlacement: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, price, status, link, isFavorite } = gift;
  return (
    <Card className="flex flex-col relative group">
      {isFavorite && (
        <StarIcon className="z-index-10 absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2 w-6 bg-white" />
      )}
      <CardHeader className="p-4 w-full flex flex-row gap-4">
        <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
          {image ? (
            <img
              src={image}
              alt=""
              className="my-auto aspect-square transition group-hover:scale-110"
            />
          ) : (
            <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
          )}
        </div>
        <div className="w-3/4 flex flex-col gap-1">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{category}</CardDescription>
          <div className="mt-2 flex justify-between">
            <Badge variant={status === "Disponible" ? "default" : "secondary"}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        {price && <Text variant="normal">{price}</Text>}

        <div className="flex gap-2 transform transition opacity-0 group-hover:opacity-100">
          {/* Opens Sheet (bottom on mobile, right on desktop) */}
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <Edit2Icon className="w-4" />
            </Button>
          )}
          {/* Opens Dialog to confirm booking */}
          {status && (
            <Button variant={"outline"} size={"icon"}>
              {status === "Disponible" ? (
                <CheckIcon className="w-4" />
              ) : (
                <XIcon className="w-4" />
              )}
            </Button>
          )}
          {/* Opens new tab */}
          <Button variant={"outline"} size={"icon"} disabled={!link}>
            <LinkIcon className="w-4" />
          </Button>
          {/* Opens dialog to confirm deletion */}
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <TrashIcon className="w-4 text-destructive" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export const GiftCardVariantNoButtons: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, price, status, link, isFavorite, isOwner } =
    gift;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="flex flex-col relative group">
          {isFavorite && (
            <StarIcon className="z-index-10 absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2 w-6 bg-white" />
          )}
          <CardHeader className="p-4 w-full flex flex-row gap-4">
            <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="my-auto aspect-square transition group-hover:scale-110"
                />
              ) : (
                <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
              )}
            </div>
            <div className="w-3/4 flex flex-col gap-1">
              <CardTitle className="truncate">{title}</CardTitle>
              <CardDescription>{category}</CardDescription>
              <div className="mt-2 flex justify-between items-center">
                <Text variant="normal">{price}</Text>
                {!isOwner && (
                  <Badge
                    variant={status === "Disponible" ? "default" : "secondary"}
                  >
                    {status}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {!isOwner && <ContextMenuItem>Ouvrir</ContextMenuItem>}
        {isOwner && <ContextMenuItem>Modifier</ContextMenuItem>}
        <ContextMenuItem disabled={!link}>Ouvrir le lien</ContextMenuItem>
        {status && !isOwner && (
          <ContextMenuItem>
            {status === "Disponible" ? "Réserver" : "Annuler ma réservation"}
          </ContextMenuItem>
        )}

        {isOwner && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive">
              Supprimer
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const GiftCardVariantOptions: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, status, link, options } = gift;
  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="p-4 w-full flex flex-row gap-4">
        <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
          {image ? (
            <img
              src={image}
              alt=""
              className="my-auto aspect-square transition group-hover:scale-110"
            />
          ) : (
            <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
          )}
        </div>
        <div className="w-3/4 flex flex-col gap-1">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{category}</CardDescription>
          <div className="mt-2 flex justify-between">
            {options && <Text variant="normal">{options.length} options</Text>}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="options" className="border-b-0">
            <div className="flex items-center justify-between">
              <Badge
                variant={status === "Disponible" ? "default" : "secondary"}
              >
                {status}
              </Badge>

              <div className="flex gap-2 transform transition opacity-0 group-hover:opacity-100">
                {/* Opens Sheet (bottom on mobile, right on desktop) */}
                {!status && (
                  <Button variant={"outline"} size={"icon"}>
                    <Edit2Icon className="w-4" />
                  </Button>
                )}
                {/* Opens Dialog to confirm booking */}
                {status && (
                  <Button variant={"outline"} size={"icon"}>
                    {status === "Disponible" ? (
                      <CheckIcon className="w-4" />
                    ) : (
                      <XIcon className="w-4" />
                    )}
                  </Button>
                )}
                {/* Opens new tab */}
                {link && (
                  <Button variant={"outline"} size={"icon"} disabled={!link}>
                    <LinkIcon className="w-4" />
                  </Button>
                )}
                {/* Opens dialog to confirm deletion */}
                {!status && (
                  <Button variant={"outline"} size={"icon"}>
                    <TrashIcon className="w-4 text-destructive" />
                  </Button>
                )}
                {options && (
                  <AccordionTrigger
                    hideChevron={true}
                    className="hover:no-underline text-left py-0"
                  >
                    <Button variant={"outline"} size={"icon"}>
                      <ListIcon className="w-4" />
                    </Button>
                  </AccordionTrigger>
                )}
              </div>
            </div>
            <AccordionContent className="pt-4 pb-0">
              {options?.map((opt) => (
                <p>{opt}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
};

export const GiftCardVariantPlacementOptions: FC<GiftCardProps> = ({
  gift,
}) => {
  const { title, category, image, status, link, options } = gift;
  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="p-4 w-full flex flex-row gap-4">
        <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
          {image ? (
            <img
              src={image}
              alt=""
              className="my-auto aspect-square transition group-hover:scale-110"
            />
          ) : (
            <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
          )}
        </div>
        <div className="w-3/4 flex flex-col gap-1">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{category}</CardDescription>
          <div className="mt-2 flex justify-between">
            <Badge variant={status === "Disponible" ? "default" : "secondary"}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="options" className="border-b-0">
            <div className="flex items-center justify-between">
              {options && (
                <Text variant="normal">{options.length} options</Text>
              )}

              <div className="flex gap-2 transform transition opacity-0 group-hover:opacity-100">
                {/* Opens Sheet (bottom on mobile, right on desktop) */}
                {!status && (
                  <Button variant={"outline"} size={"icon"}>
                    <Edit2Icon className="w-4" />
                  </Button>
                )}
                {/* Opens Dialog to confirm booking */}
                {status && (
                  <Button variant={"outline"} size={"icon"}>
                    {status === "Disponible" ? (
                      <CheckIcon className="w-4" />
                    ) : (
                      <XIcon className="w-4" />
                    )}
                  </Button>
                )}
                {/* Opens new tab */}
                {link && (
                  <Button variant={"outline"} size={"icon"} disabled={!link}>
                    <LinkIcon className="w-4" />
                  </Button>
                )}
                {/* Opens dialog to confirm deletion */}
                {!status && (
                  <Button variant={"outline"} size={"icon"}>
                    <TrashIcon className="w-4 text-destructive" />
                  </Button>
                )}
                {options && (
                  <AccordionTrigger
                    hideChevron={true}
                    className="hover:no-underline text-left py-0"
                  >
                    <Button variant={"outline"} size={"icon"}>
                      <ListIcon className="w-4" />
                    </Button>
                  </AccordionTrigger>
                )}
              </div>
            </div>
            <AccordionContent className="pt-4 pb-0">
              {options?.map((opt) => (
                <p>{opt}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
};

export const GiftCardVariantOptionsNoButtons: FC<GiftCardProps> = ({
  gift,
}) => {
  const { title, category, image, status, options } = gift;

  return (
    <Card className="flex flex-col overflow-hidden group">
      <Accordion type="single" collapsible>
        <AccordionItem value="options" className="border-b-0">
          <AccordionTrigger
            hideChevron={true}
            className="hover:no-underline text-left py-0"
          >
            <CardHeader className="p-4 w-full flex flex-row gap-4">
              <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="my-auto aspect-square transition group-hover:scale-110"
                  />
                ) : (
                  <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
                )}
              </div>
              <div className="w-3/4 flex flex-col gap-1">
                <CardTitle className="truncate">{title}</CardTitle>
                <CardDescription>{category}</CardDescription>
                <div className="mt-2 flex justify-between items-center">
                  {options && (
                    <Text variant="normal" className="">
                      {options.length} options
                    </Text>
                  )}
                  <Badge
                    variant={status === "Disponible" ? "default" : "secondary"}
                  >
                    {status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent>
            <CardFooter className="flex flex-col items-start gap-1 pb-0">
              {options?.map((opt) => (
                <p>{opt}</p>
              ))}
            </CardFooter>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export const GiftCardVariantBudget: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, status, link, budget } = gift;
  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="p-4 w-full flex flex-row gap-4">
        <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
          {image ? (
            <img
              src={image}
              alt=""
              className="my-auto aspect-square transition group-hover:scale-110"
            />
          ) : (
            <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
          )}
        </div>
        <div className="w-3/4 flex flex-col gap-1">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{category}</CardDescription>
          <div className="mt-2 flex justify-between">
            {budget && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <span className="sr-only">
                      {budget.current}€ récoltés sur l'objectif de {budget.goal}
                      €
                    </span>

                    <Progress value={(budget.current * 100) / budget.goal} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {budget.current}€ récoltés sur l'objectif de {budget.goal}
                      €
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge
          variant={
            status === "Disponible" || status === "En cours"
              ? "default"
              : "secondary"
          }
        >
          {status}
        </Badge>

        <div className="flex gap-2 transform transition opacity-0 group-hover:opacity-100">
          {/* Opens Sheet (bottom on mobile, right on desktop) */}
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <Edit2Icon className="w-4" />
            </Button>
          )}
          {/* Opens Dialog to confirm booking */}
          {status && (
            <Button variant={"outline"} size={"icon"}>
              {status === "Disponible" || status === "En cours" ? (
                <CheckIcon className="w-4" />
              ) : (
                <XIcon className="w-4" />
              )}
            </Button>
          )}
          {/* Opens new tab */}
          <Button variant={"outline"} size={"icon"} disabled={!link}>
            <LinkIcon className="w-4" />
          </Button>
          {/* Opens dialog to confirm deletion */}
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <TrashIcon className="w-4 text-destructive" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export const GiftCardVariantPlacementBudget: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, status, link, budget } = gift;
  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="p-4 w-full flex flex-row gap-4">
        <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
          {image ? (
            <img
              src={image}
              alt=""
              className="my-auto aspect-square transition group-hover:scale-110"
            />
          ) : (
            <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
          )}
        </div>
        <div className="w-3/4 flex flex-col gap-1">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{category}</CardDescription>
          <div className="mt-2 flex justify-between">
            <Badge
              variant={
                status === "Disponible" || status === "En cours"
                  ? "default"
                  : "secondary"
              }
            >
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex gap-4 justify-between">
        {budget && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <span className="sr-only">
                  {budget.current}€ récoltés sur l'objectif de {budget.goal}€
                </span>

                <Progress value={(budget.current * 100) / budget.goal} />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {budget.current}€ récoltés sur l'objectif de {budget.goal}€
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="flex gap-2 transform transition opacity-0 group-hover:opacity-100">
          {/* Opens Sheet (bottom on mobile, right on desktop) */}
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <Edit2Icon className="w-4" />
            </Button>
          )}
          {/* Opens Dialog to confirm booking */}
          {status && (
            <Button variant={"outline"} size={"icon"}>
              {status === "Disponible" || status === "En cours" ? (
                <CheckIcon className="w-4" />
              ) : (
                <XIcon className="w-4" />
              )}
            </Button>
          )}
          {/* Opens new tab */}
          <Button variant={"outline"} size={"icon"} disabled={!link}>
            <LinkIcon className="w-4" />
          </Button>
          {/* Opens dialog to confirm deletion */}
          {!status && (
            <Button variant={"outline"} size={"icon"}>
              <TrashIcon className="w-4 text-destructive" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export const GiftCardVariantBudgetNoButtons: FC<GiftCardProps> = ({ gift }) => {
  const { title, category, image, status, link, budget } = gift;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="flex flex-col overflow-hidden group">
          <CardHeader className="p-4 w-full flex flex-row gap-4">
            <div className="w-1/4 aspect-square overflow-hidden rounded-md self-center grid place-items-center bg-purple-100 dark:bg-purple-900">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="my-auto aspect-square transition group-hover:scale-110"
                />
              ) : (
                <CatIcon className="text-purple-800 dark:text-purple-100 w-8 h-8 transition group-hover:scale-110" />
              )}
            </div>
            <div className="w-3/4 flex flex-col gap-1">
              <CardTitle className="truncate">{title}</CardTitle>
              <CardDescription>{category}</CardDescription>
              <div className="mt-2 flex justify-between">
                {budget && (
                  <Text variant="small" className="">
                    {budget.goal}€
                  </Text>
                )}
                <Badge
                  variant={status === "Disponible" ? "default" : "secondary"}
                >
                  {status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="px-4">
            {budget && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <span className="sr-only">
                      {budget.current}€ récoltés sur l'objectif de {budget.goal}
                      €
                    </span>

                    <Progress value={(budget.current * 100) / budget.goal} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {budget.current}€ récoltés sur l'objectif de {budget.goal}
                      €
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Ouvrir</ContextMenuItem>
        <ContextMenuItem disabled={!link}>Ouvrir le lien</ContextMenuItem>
        {status && (
          <ContextMenuItem>
            {status === "Disponible" || status === "En cours"
              ? "Participer"
              : "Annuler ma participation"}
          </ContextMenuItem>
        )}
        {!status && <ContextMenuItem>Modifier</ContextMenuItem>}
        {!status && (
          <ContextMenuItem className="text-destructive">
            Supprimer
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
