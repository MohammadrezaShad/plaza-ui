import styled, {css, CSSObject} from 'styled-components';

import {ImageLayout, ImageObjectFit} from './Image';

export type ImageStyledProps = {
  width?: number | undefined;
  height?: number | undefined;
  $layout?: ImageLayout | undefined;
  $objectFit?: ImageObjectFit | undefined;
  $objectPosition?: string | undefined;
};

type WrapStyledProps = {
  $width?: number | undefined;
  $height?: number | undefined;
  $layout?: ImageLayout | undefined;
  sx?: CSSObject;
};

const WRAP_RESPONSIVE_STYLE = css`
  display: block;
  width: 100%;
  padding-top: ${({$height, $width}: WrapStyledProps) =>
    `calc(${$height} / ${$width} * 100%);`};
  position: relative;
`;

const IMAGE_RESPONSIVE_SYLE = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const IMAGE_FIXED_STYLE = css`
  height: ${({height, theme}) => (height ? theme.pxToRem(height) : '100%')};
  width: ${({width, theme}) => (width ? theme.pxToRem(width) : '100%')};
  object-fit: ${({$objectFit}: ImageStyledProps) => $objectFit};
  object-position: ${({$objectPosition}: ImageStyledProps) => $objectPosition};
`;

// const WRAP_FIXED_STYLE = css``;

export const Wrap = styled.section<WrapStyledProps>`
  ${setWrapLayoutStyled}
  ${({sx}) => sx};
`;

export const Image = styled.img<ImageStyledProps>`
  display: block;
  ${setImageLayoutStyles}
`;

function setWrapLayoutStyled({$layout}: WrapStyledProps) {
  if ($layout === 'responsive') return WRAP_RESPONSIVE_STYLE;
  return '';
}

function setImageLayoutStyles({$layout}: ImageStyledProps) {
  if ($layout === 'fixed') return IMAGE_FIXED_STYLE;
  if ($layout === 'responsive') return IMAGE_RESPONSIVE_SYLE;
}
