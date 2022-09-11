/* eslint-disable @typescript-eslint/no-empty-interface */
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

export type BreakpointDefaults = Record<
  'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg',
  true
>;
export interface BreakpointOverrides {}
export type Breakpoint = OverridableStringUnion<
  BreakpointDefaults,
  BreakpointOverrides
>;

export type BreakpointValues = {
  [key in Breakpoint]: number;
};

export interface Breakpoints {
  keys: Breakpoint[];
  values: Record<string, number>;
  up: (key: Breakpoint) => string;
  down: (key: Breakpoint) => string;
  between: (startKey: Breakpoint, endKey: Breakpoint) => string;
  width: (key: Breakpoint) => number;
}

export type BreakpointsInputs = Partial<
  {
    unit: string;
    step: number;
  } & Partial<Pick<Breakpoints, 'values'>>
>;

export const keys: Breakpoint[] = [
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xlg',
  'xxlg',
];

const createBreakpoints = (breakpoints: BreakpointsInputs): Breakpoints => {
  const {
    values = {
      xxs: 320,
      xs: 520,
      sm: 768,
      md: 960,
      lg: 1024,
      xlg: 1366,
      xxlg: 1536,
    },
    unit = 'px',
    step = 5,
  } = breakpoints;

  const up = (key: Breakpoint) => {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  };

  const down = (key: Breakpoint) => {
    const index = keys.indexOf(key);

    if (index === keys.length - 1) return up('xxs');

    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${+value - step / 100}${unit})`;
  };

  const between = (startKey: Breakpoint, endKey: Breakpoint) => {
    const endIndex = keys.indexOf(endKey);

    if (endIndex === keys.length - 1) return up(startKey);

    const minVal =
      typeof values[startKey] === 'number' ? values[startKey] : startKey;
    const maxVal =
      endIndex !== -1 && typeof values[keys[endIndex]] === 'number'
        ? values[keys[endIndex]]
        : endKey;

    return (
      `@media (min-width:${minVal}${unit}) and ` +
      `(max-width:${+maxVal - step / 100}${unit})`
    );
  };

  const width = (key: Breakpoint) => values[key];

  return {
    keys,
    values,
    up,
    down,
    between,
    width,
  };
};

export default createBreakpoints;
