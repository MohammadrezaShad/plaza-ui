import styled, {css, CSSObject} from 'styled-components';

import {AccordionProps} from './Accordion';

type AccordionPickedProps = Pick<
  AccordionProps,
  'expanded' | 'disableGutters' | 'disabled' | 'square'
>;

export type AccordionStyledProps = {
  [Property in keyof AccordionPickedProps as `$${Property}`]: AccordionPickedProps[Property];
} & {sx?: CSSObject};

export const Accordion = styled.div<AccordionStyledProps>`
  position: relative;
  overflow: hidden;
  ${({theme}) => css`
    position: relative;
    transition: margin ${theme.transition.duration};
    overflow-anchor: none;
    &:before {
      position: absolute;
      left: 0;
      top: -1px;
      right: 0;
      height: 1px;
      content: '';
      opacity: 1;
      background-color: ${theme.colors.stroke.origin};
      transition: opacity ${theme.transition.duration},
        background-color ${theme.transition.duration};
    }
  `};
  &:first-of-type {
    &:before {
      display: none;
    }
  }
  ${({$disableGutters, $expanded, theme}) =>
    !$disableGutters && $expanded
      ? css`
          margin: ${theme.spacing(4)} 0;
        `
      : null};
  ${({theme, $disabled}) => ($disabled ? theme.disabledStyles : null)};

  ${({$square, theme}) =>
    !$square
      ? css`
          border-radius: 0;
          &:first-of-type {
            border-top-right-radius: ${theme.radius.small};
            border-top-left-radius: ${theme.radius.small};
          }
          &:last-of-type {
            border-bottom-right-radius: ${theme.radius.small};
            border-bottom-left-radius: ${theme.radius.small};
            @supports (-ms-ime-align: auto) {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
        `
      : null};
  ${({sx}) => sx};
`;

export const Region = styled.div`
  background-color: ${({theme}) => theme.colors.background.origin};
`;

// ${
//     $expanded
//       ? css`

//   &:before {
//       opacity: 0;
//     };
//     &:first-of-type {
//       margin-top: 0;
//     };
//     &:last-of-type {
//       margin-bottom: 0;
//     };
//     & + & {
//       &:before {
//         display: none;
//       },
//     }
//   `
//       : null
//   };

//   ${
//     !$square
//       ? css`
//           border-radius: 0;
//           &:first-of-type {
//             border-top-right-radius:${theme.radius.small};
//             border-top-left-radius:${theme.radius.small};
//           },
//           &:last-of-type {
//             border-bottom-right-radius:${theme.radius.small};
//             border-bottom-left-radius:${theme.radius.small};
//             @supports (-ms-ime-align: auto) {
//                 border-bottom-left-radius: 0;
//                 border-bottom-right-radius: 0;
//             },
//           },
//         `
//       : null
//   };
//   ${
//     !$disableGutters && $expanded
//       ? css`
//           margin: ${theme.spacing(4)} 0;
//         `
//       : null
//   };

/* ${({$expanded}) =>
    $expanded
      ? css`
          & + & {
            &:before {
              display: none;
            }
          }
        `
      : null}; */

/* ${({$square, theme}) =>
    !$square
      ? css`
          border-radius: 0;
          &:first-of-type {
            border-top-right-radius: ${theme.radius.small};
            border-top-left-radius: ${theme.radius.small};
          }
          &:last-of-type {
            border-bottom-right-radius: ${theme.radius.small};
            border-bottom-left-radius: ${theme.radius.small};
            @supports (-ms-ime-align: auto) {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
        `
      : null}; */
