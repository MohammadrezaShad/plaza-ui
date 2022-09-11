import styled, {CSSObject} from 'styled-components';

import {SliderDirection, TrackTypes} from './Slider';

export const Root = styled.span<{
  $orientation: SliderDirection;
  $disabled: boolean;
  sx?: CSSObject;
}>`
  width: ${({$orientation}) => ($orientation === 'vertical' ? '2px' : '100%')};
  cursor: default;
  cursor: ${({$disabled}) => ($disabled ? 'default' : 'pointer')};
  height: ${({$orientation}) => ($orientation === 'vertical' ? '100%' : '2px')};
  display: inline-block;
  padding: ${({$orientation}) =>
    $orientation === 'vertical' ? '0 13px' : '13px 0'};
  position: relative;
  box-sizing: content-box;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: ${({$disabled}) => ($disabled ? 0.3 : null)};
  ${({sx}) => sx};
`;

export const Rail = styled.span<{
  $orientation: SliderDirection;
  $track: TrackTypes;
}>`
  height: ${({$orientation}) => ($orientation === 'vertical' ? '100%' : '2px')};
  width: ${({$orientation}) => ($orientation === 'vertical' ? '2px' : '100%')};
  display: block;
  position: absolute;
  border-radius: ${({theme}) => theme.radius.small};
  background-color: ${({$track, theme}) =>
    $track === 'inverted'
      ? theme.colors.primary.origin
      : theme.colors.backgroundVariant2.origin};
`;

export const Track = styled.span<{
  $orientation: SliderDirection;
  $track: TrackTypes;
}>`
  height: 2px;
  width: ${({$orientation}) => ($orientation === 'vertical' ? '2px' : null)};
  display: ${({$track}) => (!$track ? 'none' : 'block')};
  position: absolute;
  border-radius: 1px;
  background-color: ${({$track, theme}) =>
    $track === 'inverted'
      ? theme.colors.backgroundVariant2.origin
      : theme.colors.primary.origin};
`;

export const Thumb = styled.span<{
  $orientation: SliderDirection;
  $isRtl: boolean;
}>`
  width: 16px;
  height: 16px;
  display: flex;
  outline: 0;
  position: absolute;
  box-sizing: border-box;
  margin-top: -7px;
  transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  margin-right: ${({$orientation, $isRtl}) =>
    $orientation === 'vertical' || ($orientation === 'horizontal' && $isRtl)
      ? '-8px'
      : null};
  margin-left: ${({$orientation, $isRtl}) =>
    $orientation === 'horizontal' && !$isRtl ? '-8px' : null};
  margin-bottom: ${({$orientation}) =>
    $orientation === 'vertical' ? '-8px' : null};
  border-radius: 50%;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background.origin};
  border: 1px solid ${({theme}) => theme.colors.stroke.origin};
  &:after {
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    content: '';
    position: absolute;
    border-radius: 50%;
  }
`;

export const InnerThumb = styled.span`
  width: 10px;
  height: 10px;
  background-color: ${({theme}) => theme.colors.backgroundVariant2.origin};
  border-radius: 50%;
`;

export const Mark = styled.span<{$markActive: boolean}>`
  width: 2px;
  height: 2px;
  position: absolute;
  border-radius: 1px;
  background-color: ${({$markActive}) =>
    $markActive ? '#424242' : 'currentColor'};
  opacity: ${({$markActive}) => ($markActive ? '0.8' : null)};
`;

export const MarkLabel = styled.span<{
  $markLabelActive: boolean;
  $orientation: 'horizontal' | 'vertical';
  $isRtl: boolean;
}>`
  top: ${({$orientation}) => ($orientation === 'vertical' ? 'auto' : '26px')};
  left: ${({$orientation}) => ($orientation === 'vertical' ? '26px' : 'auto')};
  color: ${({$markLabelActive}) =>
    $markLabelActive ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  position: absolute;
  font-size: 0.875rem;
  transform: ${({$orientation, $isRtl}) =>
    $orientation === 'vertical'
      ? ' translateY(50%)'
      : `translateX(${$isRtl ? '50%' : '-50%'})`};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.43;
  white-space: nowrap;
  letter-spacing: 0.01071em;
`;
