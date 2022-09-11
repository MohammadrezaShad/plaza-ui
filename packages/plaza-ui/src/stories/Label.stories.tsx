import {Meta, Story} from '@storybook/react';
import React from 'react';

import Field from '../components/Field';
import FormControl from '../components/FormControl';
import LabelCmp from '../components/Label';

export default {
  title: 'Form/Label',
  component: LabelCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div>
    <FormControl>
      <LabelCmp {...args}>ایمیل</LabelCmp>
      <Field />
    </FormControl>
  </div>
);

export const Label = Template.bind({});

Label.args = {};
