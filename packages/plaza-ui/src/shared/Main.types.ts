import {FocusEvent, MouseEvent} from 'react';

type GenerateStringUnion<T> = Extract<
  {
    [Key in keyof T]: true extends T[Key] ? Key : never;
  }[keyof T],
  string
>;
export type Overwrite<T, U> = Omit<T, keyof U> & U;
export type OverridableStringUnion<
  T,
  U = Record<string, never>,
> = GenerateStringUnion<Overwrite<T, U>>;

export type ReactMouseEvent<T> = (event: MouseEvent<T>) => void;
export type ReactFocusEvent<T> = (event: FocusEvent<T>) => void;

export type Component = React.ElementType | keyof JSX.IntrinsicElements;
export type ReactElement = React.ElementType | JSX.Element;
