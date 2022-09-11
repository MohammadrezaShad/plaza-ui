import React from 'react';
import {addDecorator} from '@storybook/react';
import {ThemeProvider} from 'styled-components';
import {withThemesProvider} from 'storybook-addon-styled-component-theme';
import {completeSystemColor} from '@plaza-ui/styles/lib/createColors';
import createTheme from '@plaza-ui/styles/lib/createTheme';
import PlazaInitializer from '@plaza-ui/styles/lib/PlazaInitializer/PlazaInitializer';
import GlobalStyle from '@plaza-ui/styles/lib/GlobalStyles/GlobalStyles';

const colors = {
  primary: '#4DABF5',
  secondary: '#ACA8FF',
  success: '#00AD7C',
  danger: '#F54D42',
  info: '#4DABF5',
  warning: '#FACF5A',
  background: '#FFFFFF',
  backgroundVariant: '#FAFAFA',
  stroke: '#D6D6D6',
  strokeVariant: '#E8E8E8',
  text: {
    primary: '#26373B',
    secondary: '#41646E',
    invert: '#FFFFFF',
  },
};

const tadvinoSystemColors = {
  primary: completeSystemColor(colors.primary),
  secondary: completeSystemColor(colors.secondary),
  success: completeSystemColor(colors.success),
  danger: completeSystemColor(colors.danger),
  info: completeSystemColor(colors.info),
  warning: completeSystemColor(colors.warning),
  background: completeSystemColor(colors.background),
  backgroundVariant: completeSystemColor(colors.backgroundVariant),
  stroke: completeSystemColor(colors.stroke),
  strokeVariant: completeSystemColor(colors.strokeVariant),
  text: colors.text,
};

const LightTheme = createTheme({
  colors: tadvinoSystemColors,
});

export const decorators = [
  Story => (
    <PlazaInitializer theme={LightTheme}>
      <GlobalStyle />
      <Story />
    </PlazaInitializer>
  ),
];

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
