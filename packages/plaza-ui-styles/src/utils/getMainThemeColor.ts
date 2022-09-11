import {MainColor} from '../createColors';
import {DefaultTheme} from '../defaultTheme';

export default function getMainThemeColor(
  theme: DefaultTheme,
  color?: MainColor,
) {
  switch (color) {
    case 'primary':
      return theme.colors.primary.origin;
    case 'secondary':
      return theme.colors.secondary.origin;
    case 'danger':
      return theme.colors.danger.origin;
    case 'success':
      return theme.colors.success.origin;
    case 'warning':
      return theme.colors.warning.origin;
    case 'info':
      return theme.colors.info.origin;
    case 'surface':
      return theme.colors.surface.origin;
    default:
      return theme.colors.primary.origin;
  }
}
