// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { ChevronRight } from "lucide-react";

import { userEvent, within } from "@storybook/testing-library";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: {
      name: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * A simple text button.
 */
export const Simple: Story = {
  args: {
    variant: "default",
    children: "Button",
    size: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole("button"));
  },
};

/**
 * A simple icon button.
 */
export const Icon: Story = {
  args: {
    variant: "default",
    size: "icon",
    children: <ChevronRight className="h-4 w-4" />,
  },
};

/**
 * A disabled button.
 */
export const Disabled: Story = {
  args: {
    variant: "default",
    children: "Disabled",
    disabled: true,
  },
};

/**
 * Pass its styling to its children, a link for example
 */
export const AsChild: Story = {
  args: {
    variant: "link",
    children: <a href="">Click me!</a>,
    asChild: true,
  },
};
