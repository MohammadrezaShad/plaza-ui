import {Meta, Story} from '@storybook/react';
import React from 'react';

import TextArea from '../components/TextArea';

export default {
  title: 'Form/TextArea',
  component: TextArea,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div>
    <TextArea {...args} />
  </div>
);

export const TextAreaField = Template.bind({});
TextAreaField.args = {
  placeholder: 'متن توضیحات',
  label: 'عنوان فیلد',
  helperText: 'متن خطا یا توضیحات فیلد',
};
