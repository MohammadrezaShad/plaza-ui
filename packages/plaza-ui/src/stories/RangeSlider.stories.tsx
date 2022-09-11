import {Meta, Story} from '@storybook/react';
import React from 'react';

import RangeSliderComponent from '../components/RangeSlider';

export default {
  title: 'DEPRECATED/RangeSlider',
  component: RangeSliderComponent,
  argTypes: {},
} as Meta;

const Template: Story = args => <RangeSliderComponent {...args} />;

export const RangeSlider = Template.bind({});
