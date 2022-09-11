import React, {FC} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';

import {DefaultTheme} from '../defaultTheme';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children: React.ReactNode;
  theme: NonNullable<Theme> | ((outerTheme: Theme) => NonNullable<Theme>);
}

const ThemeProvider: FC<ThemeProviderProps> = ({children, theme}) => {
  if (theme == null)
    throw new Error(
      '[Plaza]: `theme` prop is missing from the <ThemeProvider>!',
    );

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
