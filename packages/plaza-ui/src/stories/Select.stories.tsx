import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import SelectCmp, {SelectProps} from '../components/Select';
import {IOptionType} from '../components/Select/Select';

const options = [
  {value: '1', label: 'نمایش همه کاربران'},
  {value: '2', label: 'فقط نمایش کاربر فعال ', isDisabled: true},
  {value: '3', label: 'فقط نمایش کاربر غیرفعال'},
];

const CustomSelect = (props: SelectProps) => {
  const [value, setValue] = useState(undefined);
  const onChange = (newValue: IOptionType | IOptionType[], action: any) => {
    console.log(action);
  };
  return (
    <SelectCmp
      {...props}
      value={value}
      defaultValue={options[0]}
      onChange={onChange}
    />
  );
};

export default {
  title: 'Form/Select',
  component: CustomSelect,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div style={{width: '300px'}}>
    <CustomSelect {...args} options={options} />
  </div>
);

export const Select = Template.bind({});
