import {Meta, Story} from '@storybook/react';
import React from 'react';

import Button from '../components/Button';
import TooltipCmp from '../components/Tooltip';

export default {
  title: 'DataDisplay/Tooltip',
  component: TooltipCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div>
    <TooltipCmp title="" {...args} arrow>
      <div>Tooltip</div>
    </TooltipCmp>
  </div>
);

export const Tooltip = Template.bind({});

Tooltip.args = {
  title: 17000,
};
