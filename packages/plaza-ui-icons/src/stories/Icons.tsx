import Typography from '@plaza-ui/core/lib/components/Typography';
import React, {FC} from 'react';
import styled from 'styled-components';

import * as AIcon from '../index';

const Wap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({theme}) => theme.colors.stroke.origin};
  border-radius: 4px;
  padding: 8px;
  align-items: center;
  flex: 0 0 130px;
`;

const IconsCollection: FC = () => {
  const icons = Object.values(AIcon);
  return (
    <Wap>
      {icons.map(Icon => (
        <Block key={Icon.name}>
          <Icon size={50} />
          <Typography>{Icon.displayName}</Typography>
        </Block>
      ))}
    </Wap>
  );
};

export default IconsCollection;
