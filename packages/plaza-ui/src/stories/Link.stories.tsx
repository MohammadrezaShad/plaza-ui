import {Meta, Story} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import Link from '../components/Link';

const Wrap = styled.div`
  width: 400px;
`;

export default {
  title: 'Navigation/Link',
  component: Link,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'surface',
        'success',
        'danger',
        'info',
        'warning',
        'background',
        'backgroundVariant',
        'stroke',
        'strokeVariant',
        'text.primary',
        'text.secondary',
        'text.invert',
      ],
      control: {type: 'select'},
    },
  },
} as Meta;

const Template: Story = args => (
  <Wrap>
    <Link {...args} />
  </Wrap>
);

export const Default = Template.bind({});

Default.args = {
  text: 'لینک',
};
