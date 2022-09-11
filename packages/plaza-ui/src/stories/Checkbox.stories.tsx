import {Meta, Story} from '@storybook/react';
import React from 'react';

import Checkbox from '../components/Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  argTypes: {
    toggleColor: {
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
      control: {type: 'select'},
    },
    text: {
      control: {type: 'text'},
    },
  },
} as Meta;

const Template: Story = args => <Checkbox {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  icon: 'icon-indeterminate',
};
