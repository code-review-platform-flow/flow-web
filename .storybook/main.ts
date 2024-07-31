import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    '@storybook/addon-essentials',
    '@storybook/addon-styling',
    "@storybook/addon-themes"
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  staticDirs: [
    {
      from: '../public/fonts',
      to: 'public/fonts',
    },
    {
      from: '../public/images',
      to: '/images',
    }
  ],
  

};
export default config;
