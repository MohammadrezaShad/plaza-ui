import styled, {css, CSSObject} from 'styled-components';

const THUMB_STYLES = css`
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: 1px solid ${({theme}) => theme.colors.stroke.origin};
  background-color: ${({theme}) => theme.colors.surface.origin};
  margin-left: ${({theme}) => `-${theme.spacing(1)}`};
  cursor: pointer;
  user-select: none;
  z-index: 10;
  will-change: left;
  &::after {
    content: '';
    background-color: #f3f3f3;
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Wrap = styled.div<{sx?: CSSObject}>`
  min-width: 300px;
  color: #90caf9;
  position: relative;
  ${({sx}) => sx};
`;

export const Rail = styled.div`
  width: 100%;
  height: 2px;
  display: block;
  opacity: 0.38;
  position: absolute;
  border-radius: 1px;
  background-color: currentColor;
`;

export const Track = styled.div.attrs(
  ({width, left}: {width: number; left: number}) => ({
    style: {
      width: `${width}%`,
      left: `${left}%`,
    },
  }),
)<{width: number; left: number}>`
  height: 2px;
  display: block;
  opacity: 0.38;
  position: absolute;
  border-radius: 1px;
  background-color: currentColor;
`;

export const Thumb = styled.span.attrs(({left}: {left: number}) => ({
  style: {
    left: `${left}%`,
  },
}))<{left: number}>`
  ${THUMB_STYLES}
`;
