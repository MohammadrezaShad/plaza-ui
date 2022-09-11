import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Button from '../components/Button';
import Fade from '../components/Fade';
import Image from '../components/Image';

export default {
  title: 'Transitions/Fade',
  component: Fade,
  argTypes: {},
} as Meta;

const TestCollapse = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div style={{textAlign: 'center'}}>
      <Button onClick={() => setIsOpen(prevOpen => !prevOpen)}>Show</Button>
      <Fade in={isOpen}>
        <div>
          <Image
            height={300}
            width={200}
            src="https://source.unsplash.com/user/erondu/200x300"
          />
        </div>
      </Fade>
    </div>
  );
};

const Template: Story = args => <TestCollapse />;

export const Primary = Template.bind({});
