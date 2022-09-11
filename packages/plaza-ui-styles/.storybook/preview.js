import React from 'react';
import {MemoryRouter} from 'react-router';
import {addDecorator} from '@storybook/react';
import {ThemeProvider} from 'styled-components';
import {withThemesProvider} from 'storybook-addon-styled-component-theme';

import LightTheme from '../src/defaultTheme';
import GlobalStyle from '../src/GlobalStyles/GlobalStyles';

const themes = [LightTheme];
addDecorator(withThemesProvider(themes), ThemeProvider);

export const decorators = [
  Story => (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <div id="dialog"></div>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
));
