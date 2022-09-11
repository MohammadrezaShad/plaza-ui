/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import PopoverComponent from '../components/Popover';
import {ArrowContainer} from '../components/Popover/ArrowContainer';

const PopoverCmp = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <PopoverComponent
      isOpen={isPopoverOpen}
      positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
      // eslint-disable-next-line react/no-unescaped-entities
      content={<div>Hi! I'm popover content.</div>}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div>
    </PopoverComponent>
  );
};

const ArrowPopoverCmp = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <PopoverComponent
      isOpen={isPopoverOpen}
      positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
      // eslint-disable-next-line react/no-unescaped-entities
      content={({position, childRect, popoverRect}) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor="wheat"
          arrowSize={10}
          arrowStyle={{opacity: 0.7}}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <div
            style={{backgroundColor: 'wheat', opacity: 0.7}}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            Hi! I'm popover content. Here's my position: {position}.
          </div>
        </ArrowContainer>
      )}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div>
    </PopoverComponent>
  );
};

export default {
  title: 'DataDisplay/Popover',
  component: PopoverCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => <PopoverCmp {...args} />;
const ArrowTemplate: Story = args => <ArrowPopoverCmp {...args} />;

export const Popover = Template.bind({});
export const ArrowPopover = ArrowTemplate.bind({});
Popover.args = {};
