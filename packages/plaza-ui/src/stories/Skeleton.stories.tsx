import {Meta, Story} from '@storybook/react';
import React from 'react';

import Skeleton from '../components/Skeleton';
import Typography from '../components/Typography';

export default {
  title: 'FEEDBACK/Skeleton',
  component: Skeleton,
  argTypes: {
    animation: {
      options: ['pulse', 'wave', false],
      control: {type: 'select'},
    },
  },
} as Meta;

const Template: Story = args => (
  <Skeleton {...args} height={200} width={200}>
    <Typography>تست تایپو گرافی</Typography>
  </Skeleton>
);

export const Wave = Template.bind({});
export const Pulse = Template.bind({});

Pulse.args = {};

Wave.args = {
  animation: 'wave',
};
