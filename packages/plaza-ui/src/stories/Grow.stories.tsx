import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Button from '../components/Button';
import Grow from '../components/Grow';
import Image from '../components/Image';

export default {
  title: 'Transitions/Grow',
  component: Grow,
  argTypes: {},
} as Meta;

const TestCollapse = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div style={{textAlign: 'center'}}>
      <Button onClick={() => setIsOpen(prevOpen => !prevOpen)}>Show</Button>
      <Grow in={isOpen}>
        <Image
          height={300}
          width={200}
          src="https://source.unsplash.com/user/erondu/200x300"
        />
      </Grow>
    </div>
  );
};

const Template: Story = args => <TestCollapse />;

export const Primary = Template.bind({});
