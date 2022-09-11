/* eslint-disable jsx-a11y/alt-text */
import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Button from '../components/Button';
import Flip from '../components/Flip';
import Image from '../components/Image';

export default {
  title: 'Transitions/Flip',
  component: Flip,
  argTypes: {},
} as Meta;

const TestCollapse = (props: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div style={{textAlign: 'center'}}>
      <Button onClick={() => setIsFlipped(prevIsFlipped => !prevIsFlipped)}>
        Flip
      </Button>{' '}
      <Flip {...props} isFlipped={isFlipped}>
        <div>
          <Image
            height={300}
            width={200}
            src="https://source.unsplash.com/user/erondu/200x300"
          />
        </div>

        <div>
          <Image
            height={300}
            width={200}
            src="https://source.unsplash.com/user/erondu/201x301"
          />
        </div>
      </Flip>
    </div>
  );
};

const Template: Story = args => <TestCollapse {...args} />;

export const Default = Template.bind({});
export const Infinite = Template.bind({});
export const Vertical = Template.bind({});

Infinite.args = {
  infinite: true,
};

Vertical.args = {
  infinite: true,
  flipDirection: 'vertical',
};
