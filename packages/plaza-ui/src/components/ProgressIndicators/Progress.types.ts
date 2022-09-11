import {MainColor} from '@plaza-ui/styles/lib/createColors';

import {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import {ProgressClasses} from './progressClasses';

export type ProgressSize = 'small' | 'medium' | 'large';

export type Progress = {
  value?: number;
  size?: ProgressSize;
  hasLabel?: boolean;
  progressColor?: MainColor;
  highlightColor?: string;
  trackColor?: MainColor | 'stroke';
  trackHighlightColor?: string;
  transition?: number;
  hasTransition?: boolean;
  component?: Component;
  sx?: SxType;
  classes?: Partial<ProgressClasses>;
  className?: string;
};
