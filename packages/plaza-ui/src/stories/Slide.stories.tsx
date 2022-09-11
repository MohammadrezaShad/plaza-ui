import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Button from '../components/Button';
import Image from '../components/Image';
import Slide from '../components/Slide';

export default {
  title: 'Transitions/Slide',
  component: Slide,
  argTypes: {},
} as Meta;

const TestCollapse = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{textAlign: 'center'}}>
      <Button onClick={() => setIsOpen(prevOpen => !prevOpen)}>Show</Button>
      <Slide in={isOpen}>
        <div>
          <Image
            height={300}
            width={200}
            src="https://source.unsplash.com/user/erondu/200x300"
          />
        </div>
      </Slide>
    </div>
  );
};

const Template: Story = args => <TestCollapse />;

export const Primary = Template.bind({});
