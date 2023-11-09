// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { LandingPage } from "./landing";

const meta: Meta<typeof LandingPage> = {
  title: "Pages/LandingPage",
  component: LandingPage,
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

/**
 * Mobile menu
 */
export const Light: Story = {
  args: {},
  parameters: {
    themes: {
      themeOverride: "light",
    },
  },
};

export const Dark: Story = {
  args: {},
  parameters: {
    themes: {
      themeOverride: "dark",
    },
  },
};
