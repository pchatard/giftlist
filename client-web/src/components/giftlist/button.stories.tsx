// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight } from "lucide-react";

import { GButton } from "./button";

const meta: Meta<typeof GButton> = {
  title: "Components/UI/Button",
  component: GButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GButton>;

/**
 * A simple text button.
 */
export const Simple: Story = {
  args: {
    children: "Button",
  },
};

/**
 * When size equals "icon", the text is hidden to only swow the icon.
 */
export const IconSize: Story = {
  name: "Icon size",
  args: {
    children: "Button",
    size: "icon",
    icon: <ChevronRight />,
  },
};

/**
 * A button with text and an icon.
 */
export const WithLeftIcon: Story = {
  name: "Left icon",
  args: {
    children: "Button",
    icon: <ChevronRight />,
  },
};

/**
 * A loading button with text. Button is automatically disabled when loading.
 */
export const Loading: Story = {
  args: {
    children: "Button",
    loading: true,
  },
};
