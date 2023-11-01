// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { userEvent, within } from "@storybook/testing-library";

import { MobileMenu } from "./menu";

const meta: Meta<typeof MobileMenu> = {
  title: "Components/MobileMenu",
  component: MobileMenu,
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileMenu>;

/**
 * Mobile menu
 */
export const Menu: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByTestId("trigger"));
    // Assert that role dialog is in canvas
  },
};
