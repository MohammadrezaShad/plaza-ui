import {Meta, Story} from '@storybook/react';
import React from 'react';

import Field from '../components/Field';
import FormControlCmp from '../components/FormControl';

export default {
  title: 'Form/FormControl',
  component: FormControlCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div>
    <FormControlCmp {...args}>
      <Field label="ایمیل" />
    </FormControlCmp>
    <FormControlCmp {...args}>
      <Field label="نام کاربری" />
    </FormControlCmp>
  </div>
);

export const FormControl = Template.bind({});

FormControl.args = {};
