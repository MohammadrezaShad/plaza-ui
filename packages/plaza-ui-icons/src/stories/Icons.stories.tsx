import {Meta, Story} from '@storybook/react';
import React from 'react';

import Icons from './Icons';

export default {
  title: 'Example/Icons',
  component: Icons,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as Meta;

const Template: Story = args => <Icons {...args} />;

export const Primary = Template.bind({});
