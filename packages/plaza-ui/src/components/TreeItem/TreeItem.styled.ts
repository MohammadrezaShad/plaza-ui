import styled, {CSSObject} from 'styled-components';

import Collapse from '../Collapse';
import treeItemClasses from './treeItemClasses';
import TreeItemContent from './TreeItemContent';

export const TreeItemRoot = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  outline: 0;
`;

export const TreeItemGroup = styled(Collapse as any)`
  margin: 0;
  padding: 0;
  margin-right: ${({theme}) => theme.spacing(4)};
`;

export const StyledTreeItemContent = styled(TreeItemContent)(({theme}) => ({
  padding: '0 8px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.colors.backgroundVariant.origin,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  [`&.${treeItemClasses.disabled}`]: {
    opacity: 0.3,
    backgroundColor: 'transparent',
  },
  [`&.${treeItemClasses.focused}`]: {
    backgroundColor: theme.colors.backgroundVariant.origin,
  },
  [`&.${treeItemClasses.selected}`]: {
    backgroundColor: theme.colors.backgroundVariant.origin,
    '&:hover': {
      backgroundColor: theme.colors.backgroundVariant.origin,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.colors.backgroundVariant.origin,
      },
    },
    [`&.${treeItemClasses.focused}`]: {
      backgroundColor: theme.colors.backgroundVariant.origin,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    marginRight: 4,
    width: 15,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 18,
    },
  },
  [`& .${treeItemClasses.label}`]: {
    width: '100%',
    minWidth: 0,
    paddingLeft: 4,
    position: 'relative',
    ...(theme.typography.variants.body1 as CSSObject),
  },
}));
