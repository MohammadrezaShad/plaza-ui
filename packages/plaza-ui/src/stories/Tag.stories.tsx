import {Meta, Story} from '@storybook/react';
import React from 'react';

import Tag from '../components/Tag';

export default {
  title: 'DataDisplay/Tag',
  component: Tag,
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

const Template: Story = args => <Tag {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: 'تگ',
};
