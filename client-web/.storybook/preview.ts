import type { Preview } from "@storybook/react";
import "../src/index.css";

import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        title: "Table of Contents",
        disable: false,
      },
    },
    layout: "centered",
  },
};

export default preview;

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
    parentSelector: ":root",
  }),
];
