import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import DividerCmp from '../components/Divider';

const Wrap = styled.div`
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Drawer = (props: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <Wrap>
      <Button onClick={onOpen}>Open Drawer</Button>
      <DividerCmp {...props}>REd</DividerCmp>
      <Button>Test</Button>
    </Wrap>
  );
};
export default {
  title: 'LAB/Divider',
  component: DividerCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => <Drawer {...args} />;

export const Divider = Template.bind({});

Divider.args = {};
