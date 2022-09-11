import {Meta, Story} from '@storybook/react';
import React from 'react';

import Button from '../components/Button/Button';

export default {
  title: 'Form/Button',
  component: Button,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
        'info',
        'link',
      ],
      control: {type: 'select'},
      text: {
        control: {type: 'text'},
      },
    },
  },
} as Meta;

const Template: Story = args => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: 'Button',
};
