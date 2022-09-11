import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Button from '../components/Button';
import DrawerCmp from '../components/Drawer';

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>
      <DrawerCmp isOpen={isOpen} onClose={onClose}>
        Drawer
      </DrawerCmp>
    </>
  );
};
export default {
  title: 'DataDisplay/Drawer',
  component: Drawer,
  argTypes: {},
} as Meta;
const Template: Story = args => <Drawer {...args} />;

export const DrawerStory = Template.bind({});

DrawerStory.args = {};
