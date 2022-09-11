/* eslint-disable react/no-array-index-key */
import Chevron2Left from '@plaza-ui/icons/lib/Chevron2Left';
import HomeIcon from '@plaza-ui/icons/lib/Home';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './Breadcrumbs.styled';
import {
  BreadcrumbsClasses,
  getBreadcrumbsUtilityClass,
} from './breadcrumbsClasses';

type BreadcrumbsProps = {
  children?: ReactNode;
  hasHomeIcon?: boolean;
  sx?: SxType;
  className?: string;
  classes?: Partial<BreadcrumbsClasses>;
  Icon?: Component;
  HomeIcon?: Component;
};

const useUtilityClasses = (ownerState: Pick<BreadcrumbsProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
    icon: ['icon'],
  };

  return composeClasses(slots, getBreadcrumbsUtilityClass, classes);
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  children,
  hasHomeIcon = true,
  sx,
  className,
  classes: inputClasses,
  Icon = Chevron2Left,
  HomeIcon: HomeIconInput = HomeIcon,
}) => {
  const BreadCrumbItems = React.Children.toArray(children);
  const sxStyles = useSxProp(sx);
  const ownerState = {
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <S.Breadcrumbs sx={sxStyles} className={clsx(classes.root, className)}>
      {BreadCrumbItems.map((BreadCrumbItem, index) => (
        <BreadcrumbItem key={index}>
          {index === 0 && hasHomeIcon ? (
            <HomeIconInput
              component={S.HomeIcon}
              color="primary"
              size={32}
              className={classes.icon}
            />
          ) : null}
          {BreadCrumbItem}
          {BreadCrumbItems.length - 1 === index ? null : (
            <Icon component={S.Icon} size={20} className={classes.icon} />
          )}
        </BreadcrumbItem>
      ))}
    </S.Breadcrumbs>
  );
};

export default Breadcrumbs;

const BreadcrumbItem: FC = ({children}) => <>{children}</>;
