import { CheckIcon, Edit2Icon, LinkIcon, TrashIcon } from "lucide-react";
import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import image from "@/images/cat.jpg";

import { Text } from "../text/text";

interface GiftCardProps {
  title: string;
  description: string;
}

export const GiftCard: FC<GiftCardProps> = ({ title, description }) => {
  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="w-full flex flex-row gap-4">
        <div className="w-1/4 overflow-hidden rounded-md self-center">
          <img
            src={image}
            alt=""
            className="my-auto aspect-square transition group-hover:scale-110"
          />
        </div>
        <div className="w-3/4 flex flex-col gap-1 pr-6">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="mt-1 flex justify-between">
            <Text variant="small" className="">
              13,00€
            </Text>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge variant={"default"}>Disponible</Badge>
        <div className="flex gap-2">
          <Button variant={"outline"} size={"icon"}>
            <Edit2Icon className="w-4" />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <CheckIcon className="w-4" />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <LinkIcon className="w-4" />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <TrashIcon className="w-4 text-destructive" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const GiftCardVariant: FC<GiftCardProps> = ({ title, description }) => {
  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="p-4 w-full flex flex-row gap-4">
        <div className="w-1/4 overflow-hidden rounded-md self-center">
          <img
            src={image}
            alt=""
            className="my-auto aspect-square transition group-hover:scale-110"
          />
        </div>
        <div className="w-3/4 flex flex-col gap-1">
          <CardTitle className="truncate">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="mt-2 flex justify-between">
            <Text variant="small" className="">
              13,00€
            </Text>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge variant={"secondary"}>Réservé</Badge>
        <div className="flex gap-2">
          {/* Opens Sheet (bottom on mobile, right on desktop) */}
          <Button variant={"outline"} size={"icon"}>
            <Edit2Icon className="w-4" />
          </Button>
          {/* Opens Dialog to confirm booking */}
          <Button variant={"outline"} size={"icon"}>
            <CheckIcon className="w-4" />
          </Button>
          {/* Opens new tab */}
          <Button variant={"outline"} size={"icon"}>
            <LinkIcon className="w-4" />
          </Button>
          {/* Opens dialog to confirm deletion */}
          <Button variant={"outline"} size={"icon"}>
            <TrashIcon className="w-4 text-destructive" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
