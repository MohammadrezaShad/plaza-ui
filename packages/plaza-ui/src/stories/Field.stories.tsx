import {Meta, Story} from '@storybook/react';
import React from 'react';

import Field from '../components/Field';
import Password from '../components/PasswordField';

export default {
  title: 'Form/Field',
  component: Field,
  argTypes: {},
} as Meta;

const Template: Story = args => <Field {...args} />;
const PasswordTemplate: Story = args => <Password {...args} />;

export const TextField = Template.bind({});
TextField.args = {
  placeholder: 'متن توضیحات',
  label: 'عنوان فیلد',
  helperText: 'متن خطا یا توضیحات فیلد',
};

export const PasswordFiled = PasswordTemplate.bind({});
PasswordFiled.args = {};
