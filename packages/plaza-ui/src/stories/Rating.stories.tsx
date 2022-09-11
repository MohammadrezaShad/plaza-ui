import {Meta, Story} from '@storybook/react';
import React from 'react';

import RatingCmp from '../components/Rating';

export default {
  title: 'LAB/Rating',
  component: RatingCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => <RatingCmp {...args} />;

export const Rating = Template.bind({});

Rating.args = {
  text: 'Button',
};
