import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Button from '../components/Button';
import Image from '../components/Image';
import Zoom from '../components/Zoom';

export default {
  title: 'Transitions/Zoom',
  component: Zoom,
  argTypes: {},
} as Meta;

const TestCollapse = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{textAlign: 'center'}}>
      <Button onClick={() => setIsOpen(prevOpen => !prevOpen)}>Show</Button>
      <Zoom in={isOpen}>
        <div>
          <Image
            height={300}
            width={200}
            src="https://source.unsplash.com/user/erondu/200x300"
          />
        </div>
      </Zoom>
    </div>
  );
};

const Template: Story = args => <TestCollapse />;

export const Primary = Template.bind({});
