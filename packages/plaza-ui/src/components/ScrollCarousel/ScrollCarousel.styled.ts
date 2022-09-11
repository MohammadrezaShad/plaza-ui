import styled, {css} from 'styled-components';

export const Wrap = styled.div<{$hasScroll?: boolean}>`
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
  ${({$hasScroll}) =>
    !$hasScroll
      ? css`
          scrollbar-color: #d6dee1 transparent;
          scrollbar-width: thin;

          /* Works on Chrome, Edge, and Safari */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background-color: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #d6dee1;
            border-radius: 20px;
          }
        `
      : css`
          overflow: -moz-scrollbars-none;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          &::-webkit-scrollbar {
            display: none;
          }
        `}
`;
