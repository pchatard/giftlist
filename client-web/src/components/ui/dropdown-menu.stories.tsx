import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Atoms/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/**
 * A simple text button.
 */
const DropdownMenuTemplate: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>One</DropdownMenuItem>
        <DropdownMenuItem>Two</DropdownMenuItem>
        <DropdownMenuItem>Three</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Simple: Story = {
  ...DropdownMenuTemplate,
};

// TODO
export const Groups: Story = {
  ...DropdownMenuTemplate,
};

// TODO
export const SubMenu: Story = {
  ...DropdownMenuTemplate,
};

// TODO
export const Shortcuts: Story = {
  ...DropdownMenuTemplate,
};
