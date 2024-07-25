import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { createGlobalStyle, css } from "styled-components";
import { Pretendard } from '../public/fonts/font';

const GlobalStyles = createGlobalStyle`${css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;

          font-family: ${Pretendard.style.fontFamily};
        }
	`}
`;



const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles,
  }),
];
