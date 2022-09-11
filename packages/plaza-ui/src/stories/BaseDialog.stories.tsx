import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import BaseDialog from '../components/BaseDialog';
import {Button} from '../components/Button/Button.styled';
import DialogBody from '../components/DialogBody';
import DialogHead from '../components/DialogHead';
import Typography from '../components/Typography';

const Wrapper = styled.div`
  background-color: white;
  border-radius: 32px;
  padding: 16px;
`;

const Dialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      <BaseDialog isOpen={isOpen} onClose={onClose}>
        <DialogBody>
          <DialogHead title="red" onClose={onClose} />
          <Typography>Red</Typography>
        </DialogBody>
      </BaseDialog>
    </>
  );
};

export default {
  title: 'Feedback/Dialog',
  component: Dialog,
  argTypes: {},
} as Meta;

const Template: Story = args => <Dialog {...args} />;

export const DialogTemp = Template.bind({});

DialogTemp.args = {};
