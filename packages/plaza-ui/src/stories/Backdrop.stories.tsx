import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import BackdropCmp from '../components/Backdrop';
import Button from '../components/Button';

const BackdropTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <Button onClick={onOpen}>Open Backdrop</Button>
      <BackdropCmp open={isOpen} onClose={onClose} />
    </div>
  );
};

export default {
  title: 'Feedback/Backdrop',
  component: BackdropCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => <BackdropTest {...args} />;

export const DialogTemp = Template.bind({});

DialogTemp.args = {};
