import {CSSProperties, FC, MutableRefObject, Ref} from 'react';

import {Component} from '../../shared';

export interface ContentLocation {
  top: number;
  left: number;
}

export interface PopoverState {
  childRect: DOMRect;
  popoverRect: DOMRect;
  parentRect: DOMRect;
  boundaryRect: DOMRect;
  position?: PopoverPosition;
  align?: PopoverAlign;
  padding: number;
  nudgedLeft: number;
  nudgedTop: number;
  boundaryInset: number;
}

export type ContentRenderer = (popoverState: PopoverState) => JSX.Element;
export type ContentLocationGetter = (
  popoverState: PopoverState,
) => ContentLocation;

export type PopoverPosition = 'left' | 'right' | 'top' | 'bottom';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface UseArrowContainerProps {
  childRect: DOMRect;
  popoverRect: DOMRect;
  position?: PopoverPosition;
  arrowSize: number;
  arrowColor: string;
}

export interface ArrowContainerProps extends UseArrowContainerProps {
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  arrowStyle?: React.CSSProperties;
  arrowClassName?: string;
  containerComponent?: Component;
  arrowComponent?: Component;
}

export interface UsePopoverProps {
  childRef: React.MutableRefObject<HTMLElement | undefined>;
  positions: PopoverPosition[];
  align: PopoverAlign;
  padding: number;
  reposition: boolean;
  boundaryInset: number;
  parentElement?: HTMLElement;
  boundaryElement?: HTMLElement;
  containerClassName?: string;
  contentLocation?: ContentLocationGetter | ContentLocation;
  onPositionPopover(popoverState: PopoverState): void;
}

export interface PopoverProps {
  isOpen: boolean;
  children: JSX.Element;
  content: ContentRenderer | JSX.Element;
  positions?: PopoverPosition[];
  align?: PopoverAlign;
  padding?: number;
  reposition?: boolean;
  ref?: Ref<HTMLElement>;
  containerClassName?: string;
  parentElement?: HTMLElement;
  containerStyle?: Partial<CSSStyleDeclaration>;
  contentLocation?: ContentLocationGetter | ContentLocation;
  boundaryElement?: HTMLElement;
  boundaryInset?: number;
  boundaryTolerance?: number;
  onClickOutside?: (e: MouseEvent) => void;
}

export interface PositionPopoverProps {
  positionIndex?: number;
  childRect?: DOMRect;
  popoverRect?: DOMRect;
  parentRect?: DOMRect;
  scoutRect?: DOMRect;
  parentRectAdjusted?: DOMRect;
  boundaryRect?: DOMRect;
}

export type PositionPopover = (props?: PositionPopoverProps) => void;

export type PopoverRefs = {
  popoverRef: MutableRefObject<HTMLDivElement>;
  scoutRef: MutableRefObject<HTMLDivElement>;
};

export type UsePopoverResult = {
  positionPopover: PositionPopover;
  popoverRef: MutableRefObject<HTMLDivElement>;
  scoutRef: MutableRefObject<HTMLDivElement>;
};

export interface UseArrowContainerResult {
  arrowStyle: CSSProperties;
  arrowContainerStyle: CSSProperties;
}
