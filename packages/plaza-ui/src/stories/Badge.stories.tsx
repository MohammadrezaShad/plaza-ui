import {Meta, Story} from '@storybook/react';
import React from 'react';

import Badge from '../components/Badge';

export default {
  title: 'DataDisplay/Badge',
  component: Badge,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
        'info',
        'dark',
        'strokeVariant',
      ],
      control: {type: 'select'},
      text: {
        control: {type: 'text'},
      },
    },
  },
} as Meta;

const Template: Story = args => <Badge {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: '17',
};
