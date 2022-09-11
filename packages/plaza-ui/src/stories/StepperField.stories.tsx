import {Meta, Story} from '@storybook/react';
import React from 'react';

import StepperFieldCmp from '../components/StepperField';

export default {
  title: 'Form/StepperField',
  component: StepperFieldCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => <StepperFieldCmp {...args} />;

export const StepperField = Template.bind({});
