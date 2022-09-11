import styled, {css, CSSObject} from 'styled-components';

import {DividerOrientation, DividerTextAlign, DividerVariant} from './Divider';

export type DividerStyledProps = {
  $absolute: boolean;
  $flexItem: boolean;
  $light: boolean;
  $textAlign: DividerTextAlign;
  $variant: DividerVariant;
  $orientation: DividerOrientation;
  $hasChildren: boolean;
  sx?: CSSObject;
};

export const Divider = styled.div<DividerStyledProps>`
  direction: ltr;
  margin: 0;
  flex-shrink: 0;
  border-width: 0 0px 1px 0;
  border-style: solid;
  border-image-slice: 1;
  border-image-source: ${({theme}) => `linear-gradient(
    90deg,
    ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 0%,
    ${theme.colors.stroke.origin} 50%,
    ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 100%
  );`};
  ${({$absolute}) =>
    $absolute
      ? css`
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        `
      : null};
  ${({$light, theme, $orientation}) =>
    $light
      ? css`
          border-image-source: linear-gradient(
            ${$orientation === 'horizontal' ? '90deg' : '180deg'},
            ${theme.colors.changeAlpha(theme.colors.strokeVariant.origin, 0)} 0%,
            ${theme.colors.strokeVariant.origin} 50%,
            ${theme.colors.changeAlpha(theme.colors.strokeVariant.origin, 0)}
              100%
          ) !important;
        `
      : null};
  ${({$variant, theme}) =>
    $variant === 'inset'
      ? css`
          margin-left: ${theme.spacing(11)};
        `
      : null};
  ${({$variant, $orientation, theme}) =>
    $variant === 'middle' && $orientation === 'horizontal'
      ? css`
          margin-left: ${theme.spacing(2)};
          margin-right: ${theme.spacing(2)};
        `
      : null};
  ${({$variant, $orientation, theme}) =>
    $variant === 'middle' && $orientation === 'vertical'
      ? css`
          margin-top: ${theme.spacing(1)};
          margin-bottom: ${theme.spacing(1)};
        `
      : null};
  ${({$orientation, theme}) =>
    $orientation === 'vertical'
      ? css`
          height: 100%;
          border-width: 0 1px 0 0;
          border-image-source: linear-gradient(
            180deg,
            ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 0%,
            ${theme.colors.stroke.origin} 50%,
            ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 100%
          );
        `
      : null};
  ${({$flexItem}) =>
    $flexItem
      ? css`
          align-self: stretch;
          height: auto;
        `
      : null};
  ${({$hasChildren, theme}) =>
    $hasChildren
      ? css`
          display: flex;
          align-items: flex-start;
          white-space: nowrap;
          text-align: center;
          border: 0;
          &::before,
          &::after {
            position: relative;
            width: 100%;
            top: 50%;
            content: '';
            transform: translateY(50%);
          }
          &::after {
            border-width: 1px 0 0 0;
            border-style: solid;
            border-image-slice: 1;
            border-image-source: linear-gradient(
              90deg,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 1)} 0%,
              ${theme.colors.stroke.origin} 10%,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 100%
            );
          }
          &::before {
            border-width: 1px 0 0 0;
            border-style: solid;
            border-image-slice: 1;
            border-image-source: linear-gradient(
              90deg,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 0%,
              ${theme.colors.stroke.origin} 90%,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 1)} 100%
            );
          }
        `
      : null};
  ${({$hasChildren, $orientation, theme}) =>
    $hasChildren && $orientation === 'vertical'
      ? css`
          flex-direction: column;
          &::before,
          &::after {
            height: 100%;
            top: 0%;
            left: 50%;
            transform: translateX(0%);
          }
          &::after {
            border-width: 0 0 0 1px;
            border-style: solid;
            border-image-slice: 1;
            border-image-source: linear-gradient(
              180deg,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 1)} 0%,
              ${theme.colors.stroke.origin} 10%,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 100%
            );
          }
          &::before {
            border-width: 0 0 0 1px;
            border-style: solid;
            border-image-slice: 1;
            border-image-source: linear-gradient(
              180deg,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 0)} 0%,
              ${theme.colors.stroke.origin} 90%,
              ${theme.colors.changeAlpha(theme.colors.stroke.origin, 1)} 100%
            );
          }
        `
      : null};
  ${({$textAlign, $orientation}) =>
    $textAlign === 'right' && $orientation !== 'vertical'
      ? css`
          &::before {
            width: 90%;
          }
          &::after {
            width: 10%;
          }
        `
      : null};
  ${({$textAlign, $orientation}) =>
    $textAlign === 'left' && $orientation !== 'vertical'
      ? css`
          &::before {
            width: 10%;
          }
          &::after {
            width: 90%;
          }
        `
      : null};

  ${({sx}) => sx};
`;

export const DividerWrap = styled.div<{$orientation: DividerOrientation}>`
  display: inline-block;
  padding-left: ${({theme}) => theme.spacing(3)};
  padding-right: ${({theme}) => theme.spacing(3)};
  ${({theme, $orientation}) =>
    $orientation === 'vertical'
      ? css`
          padding-top: ${theme.spacing(2)};
          padding-bottom: ${theme.spacing(2)};
        `
      : null};
`;
