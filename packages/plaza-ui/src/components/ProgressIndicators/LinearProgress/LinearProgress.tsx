import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC} from 'react';

import useSxProp from '../../../hooks/useSxProp';
import {Progress} from '../Progress.types';
import {getProgressUtilityClass} from '../progressClasses';
import * as S from './LinearProgress.styled';

export interface Direction extends Progress {
  direction?: 'rtl' | 'ltr';
}

const useUtilityClasses = (ownerState: Pick<Progress, 'classes'>) => {
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

const Linear: FC<Direction> = ({
  hasLabel,
  size = 'medium',
  value = 0,
  progressColor = 'primary',
  trackColor = 'stroke',
  trackHighlightColor,
  highlightColor,
  transition,
  component,
  hasTransition = true,
  sx,
  classes: inputClasses,
  className,
  direction = 'ltr',
}) => {
  const sxStyles = useSxProp(sx);
  const ownerState = {
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);
  return (
    <S.Wrap className={classes.wrap} sx={sxStyles}>
      {hasLabel ? <S.Label className={classes.label}>{value}%</S.Label> : null}
      <S.Track
        className={classes.track}
        $size={size}
        $trackColor={trackColor}
        $trackHighlightColor={trackHighlightColor}
      >
        <S.Progress
          className={clsx(classes.root, className)}
          as={component}
          $direction={direction}
          $value={value}
          $progressColor={progressColor}
          $highlightColor={highlightColor}
          $transition={transition}
          $hasTransition={hasTransition}
        />
      </S.Track>
    </S.Wrap>
  );
};

export default Linear;
