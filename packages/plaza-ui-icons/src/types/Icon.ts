import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import React, {ReactNode} from 'react';

declare type Component = React.ElementType | keyof JSX.IntrinsicElements;
export declare type IconColor = DefaultColor | 'currentColor';
export declare type IconProps = {
  children?: ReactNode;
  component?: Component;
  className?: string;
  viewBox?: string;
  title?: string;
  color?: IconColor;
  size?: IconSize;
} & Omit<React.HTMLAttributes<SVGElement>, 'children'>;
export declare type IconSize = number | 'auto';
declare const Icon: React.ForwardRefExoticComponent<
  {
    children?: ReactNode;
    component?: Component | undefined;
    className?: string | undefined;
    viewBox?: string | undefined;
    title?: string | undefined;
    color?: IconColor | undefined;
    size?: IconSize | undefined;
  } & Omit<React.HTMLAttributes<SVGElement>, 'children'> &
    React.RefAttributes<SVGSVGElement | null>
>;
export default Icon;
