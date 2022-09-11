import Color from 'color';
import styled, {css, CSSObject} from 'styled-components';

export const TableRow = styled.tr<{
  $hover?: boolean;
  $selected?: boolean;
  $isHead?: boolean;
  sx?: CSSObject;
}>`
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;
  position: relative;

  ${({$isHead, theme, $selected, $hover}) =>
    $isHead
      ? null
      : css`
          background-color: ${$selected
            ? Color(theme.colors.black).alpha(0.04).string()
            : null};
          ${$hover
            ? css`
                transition: background-color ${theme.transition.duration};
                &:hover {
                  background-color: ${Color(theme.colors.black)
                    .alpha(0.04)
                    .string()};
                }
              `
            : null}
          &:not(:last-child) {
            &:after {
              content: '';
              width: 100%;
              position: absolute;
              bottom: 0;
              right: 0;
              border-width: 0 0 1px 0;
              border-style: solid;
              border-image-source: linear-gradient(
                90deg,
                #fff 0,
                #e6e6e6 50%,
                #fff 100%
              );
              border-image-slice: 1;
            }
          }
        `}
  ${({sx}) => sx};
`;
