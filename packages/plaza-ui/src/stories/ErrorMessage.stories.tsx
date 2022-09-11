import {Meta, Story} from '@storybook/react';
import React from 'react';

import ErrorMessageCmp from '../components/ErrorMessage';
import Field from '../components/Field';
import FormControl from '../components/FormControl';

export default {
  title: 'Form/ErrorMessage',
  component: ErrorMessageCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div>
    <FormControl>
      <Field label="ایمیل" error />
      <ErrorMessageCmp {...args}>متن خطا اینجا قرار خواهد گرفت</ErrorMessageCmp>
    </FormControl>
  </div>
);

export const ErrorMessage = Template.bind({});

ErrorMessage.args = {};
