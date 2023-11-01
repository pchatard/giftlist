import type { Meta, StoryObj } from "@storybook/react";

import avatarImage from "@/assets/cat.jpg";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AvatarImage>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar>
      <AvatarImage {...args} />
    </Avatar>
  ),
  args: {
    src: avatarImage,
    alt: "Test image",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.findByTestId("avatar-img")).toHaveAttribute(
      "src",
      avatarImage
    );
    await expect(await canvas.findByTestId("avatar-img")).toHaveAttribute(
      "alt",
      "Test image"
    );
  },
};

export const WithoutImage: Story = {
  render: (args) => (
    <Avatar>
      <AvatarImage {...args} />
      <AvatarFallback>PC</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      await canvas.findByTestId("avatar-fallback")
    ).toBeInTheDocument();

    await expect(canvas.queryByTestId("avatar-img")).toBeNull();
  },
};
