import type { Meta, StoryObj } from "@storybook/react";

import { userEvent, within } from "@storybook/testing-library";

import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

const meta: Meta<typeof Sheet> = {
  title: "UI/Atoms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SheetContent>;

/**
 * A simple text button.
 */
const SheetTemplate: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open</Button>
      </SheetTrigger>
      <SheetContent {...args}>Hello World</SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole("button"));
  },
};

export const SheetExample: Story = {
  ...SheetTemplate,
  args: {
    side: "left",
  },
};
