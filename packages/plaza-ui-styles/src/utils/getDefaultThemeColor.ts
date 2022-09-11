import {DefaultColor} from '../createColors';
import {DefaultTheme} from '../defaultTheme';

export default function getDefaultThemeColor(
  theme: DefaultTheme,
  color?: DefaultColor,
) {
  switch (color) {
    case 'primary':
      return theme.colors.primary.origin;
    case 'secondary':
      return theme.colors.secondary.origin;
    case 'surface':
      return theme.colors.surface.origin;
    case 'success':
      return theme.colors.success.origin;
    case 'danger':
      return theme.colors.danger.origin;
    case 'info':
      return theme.colors.info.origin;
    case 'warning':
      return theme.colors.warning.origin;
    case 'background':
      return theme.colors.background.origin;
    case 'backgroundVariant':
      return theme.colors.backgroundVariant.origin;
    case 'backgroundVariant2':
      return theme.colors.backgroundVariant2.origin;
    case 'stroke':
      return theme.colors.stroke.origin;
    case 'strokeVariant':
      return theme.colors.strokeVariant.origin;
    case 'textPrimary':
      return theme.colors.text.primary;
    case 'textSecondary':
      return theme.colors.text.secondary;
    case 'textInvert':
      return theme.colors.text.invert;
    case 'textPrice':
      return theme.colors.text.price;
    default:
      return color;
  }
}
