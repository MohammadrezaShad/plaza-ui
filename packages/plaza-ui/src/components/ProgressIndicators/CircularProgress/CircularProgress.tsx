import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC} from 'react';

import useSxProp from '../../../hooks/useSxProp';
import {Progress} from '../Progress.types';
import {getProgressUtilityClass} from '../progressClasses';
import * as S from './CircularProgress.styled';

export type CircularVariant = 'determinate' | 'indeterminate';

export type CircularProps = {
  variant?: CircularVariant;
} & Progress;

const useUtilityClasses = (ownerState: Pick<CircularProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
    icon: ['icon'],
    label: ['label'],
    track: ['container'],
    wrap: ['wrap'],
  };

  return composeClasses(slots, getProgressUtilityClass, classes);
};

const Circular: FC<CircularProps> = ({
  value = 0,
  hasLabel,
  size = 'medium',
  progressColor = 'primary',
  highlightColor,
  trackColor = 'stroke',
  trackHighlightColor,
  component,
  transition,
  hasTransition = true,
  variant = 'determinate',
  sx,
  classes: inputClasses,
  className,
}) => {
  const sxStyles = useSxProp(sx);
  const ownerState = {
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <S.Wrap className={classes.wrap} $size={size} sx={sxStyles}>
      <S.Track
        className={classes.track}
        viewBox="22 22 44 44"
        $size={size}
        $trackColor={trackColor}
        $trackHighlightColor={trackHighlightColor}
      >
        <circle cx="44" cy="44" r="20" fill="none" />
      </S.Track>
      <S.ProgressWrap $size={size} $hasTransition={hasTransition}>
        <S.Progress
          className={clsx(classes.root, className)}
          as={component}
          viewBox="22 22 44 44"
          $value={value}
          $size={size}
          $progressColor={progressColor}
          $highlightColor={highlightColor}
          $transition={transition}
          $hasTransition={hasTransition}
          $variant={variant}
        >
          <circle cx="44" cy="44" r="20" fill="none" />
        </S.Progress>
      </S.ProgressWrap>
      {hasLabel ? <S.Label className={classes.label}>{value}%</S.Label> : null}
    </S.Wrap>
  );
};

export default Circular;
