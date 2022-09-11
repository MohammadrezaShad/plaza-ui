import {Meta, Story} from '@storybook/react';
import React from 'react';

import Pagination from '../components/Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {},
} as Meta;

const Template: Story = args => <Pagination {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  count: 20,
  disabled: false,
};
