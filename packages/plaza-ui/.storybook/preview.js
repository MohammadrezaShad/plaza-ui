import React from 'react';
import {MemoryRouter} from 'react-router';
import {addDecorator} from '@storybook/react';
import {ThemeProvider} from 'styled-components';
import {withThemesProvider} from 'storybook-addon-styled-component-theme';
import ToastContainer from '../src/components/ToastContainer';
import {completeSystemColor} from '@plaza-ui/styles/lib/createColors';
import createTheme from '@plaza-ui/styles/lib/createTheme';
import PlazaInitializer from '@plaza-ui/styles/lib/PlazaInitializer/PlazaInitializer';
import GlobalStyle from '@plaza-ui/styles/lib/GlobalStyles/GlobalStyles';

const colors = {
  primary: '#F89A01',
  secondary: '#1A8CE7',
  success: '#00AD7C',
  danger: '#F54D42',
  info: '#1A8CE7',
  warning: '#FACF5A',
  background: '#FFFFFF',
  backgroundVariant: '#FAFAFA',
  backgroundVariant2: '#F2F2F2',
  stroke: '#D6D6D6',
  strokeVariant: '#E8E8E8',
  text: {
    primary: '#26373B',
    secondary: '#6B8289',
    invert: '#FFFFFF',
    price: '#26373B',
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

const themes = [LightTheme];
addDecorator(withThemesProvider(themes), ThemeProvider);

export const decorators = [
  Story => (
    <PlazaInitializer theme={LightTheme}>
      <GlobalStyle />
      <div id="dialog"></div>
      <Story />
      <ToastContainer />
    </PlazaInitializer>
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
