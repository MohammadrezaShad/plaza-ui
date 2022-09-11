import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Button from '../components/Button';
import Collapse from '../components/Collapse';
import Image from '../components/Image';

export default {
  title: 'Transitions/Collapse',
  component: Collapse,
  argTypes: {},
} as Meta;

const TestCollapse = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div style={{textAlign: 'center'}}>
      <Button onClick={() => setIsOpen(prevOpen => !prevOpen)}>Show</Button>
      <Collapse in={isOpen}>
        <Image
          height={300}
          width={200}
          src="https://source.unsplash.com/user/erondu/200x300"
        />
      </Collapse>
    </div>
  );
};

const Template: Story = args => <TestCollapse />;

export const Primary = Template.bind({});
