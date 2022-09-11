import {Meta, Story} from '@storybook/react';
import React from 'react';

import Switch from '../components/Switch';

export default {
  title: 'Form/Switch',
  component: Switch,
  argTypes: {
    toggleColor: {
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
      control: {type: 'select'},
    },
  },
} as Meta;

const Template: Story = args => <Switch {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
