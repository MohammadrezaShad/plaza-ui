import {Meta, Story} from '@storybook/react';
import React from 'react';

import Radio from '../components/Radio';

export default {
  title: 'Form/Radio',
  component: Radio,
  argTypes: {
    toggleColor: {
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
      control: {type: 'select'},
    },
  },
} as Meta;

const Template: Story = args => {
  const [first, setfirst] = React.useState(1);
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfirst(+e.target.value);
  };
  return (
    <div>
      <Radio
        {...args}
        name="red"
        on={first === 1}
        value={1}
        onChange={handlechange}
        disabled
      />
      <Radio
        {...args}
        name="red"
        on={first === 2}
        value={2}
        onChange={handlechange}
      />
      <Radio
        {...args}
        name="red"
        on={first === 3}
        value={3}
        onChange={handlechange}
      />
    </div>
  );
};

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
