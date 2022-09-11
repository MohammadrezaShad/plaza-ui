export type DefaultTimingFunctions = 'fadeInOut' | 'fadeIn' | 'fadeOut';
export const defaultDuration = '0.3s';

export const defaultTimingFunctions = {
  fadeOut: 'ease-out',
  fadeIn: 'ease-in',
  fadeInOut: 'ease-in-out',
};

export type TimingFunctions = Partial<Record<DefaultTimingFunctions, string>>;

export type TransitionPropertiesInputs = {
  duration?: string;
  timingFunction?: TimingFunctions;
};

const createTransitionProperties = (
  transitionProperties: TransitionPropertiesInputs,
) => {
  const {duration = defaultDuration, timingFunction = defaultTimingFunctions} =
    transitionProperties;

  const extendedTimingFunction = {...defaultTimingFunctions, ...timingFunction};

  return {timingFunction: extendedTimingFunction, duration};
};

export default createTransitionProperties;
