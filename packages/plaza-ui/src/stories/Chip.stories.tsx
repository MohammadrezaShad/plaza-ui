import {Meta, Story} from '@storybook/react';
import React from 'react';

import Chip from '../components/Chip';

export default {
  title: 'DataDisplay/Chip',
  component: Chip,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
      control: {type: 'select'},
      text: {
        control: {type: 'text'},
      },
    },
  },
} as Meta;

const Template: Story = args => <Chip {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: 'چیپس',
  onDelete: null,
};
