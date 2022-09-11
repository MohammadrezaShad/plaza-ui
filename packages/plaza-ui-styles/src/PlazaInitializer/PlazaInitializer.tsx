import React, {FC, ReactNode} from 'react';

import defaultTheme, {DefaultTheme as Theme} from '../defaultTheme';
import ThemeProvider from '../ThemeProvider';

type PlazaInitializerProps = {
  children: ReactNode;
  theme?: Theme;
};

const PlazaInitializer: FC<PlazaInitializerProps> = ({
  children,
  theme = defaultTheme,
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default PlazaInitializer;
