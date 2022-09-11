/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Fade from '../components/Fade';
import PopperComponent from '../components/Popper';

const PopperCmp = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(previousOpen => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <PopperComponent id={id} open={open} anchorEl={anchorEl} transition>
        {({TransitionProps}: any) => (
          <Fade {...TransitionProps}>
            <div>The content of the Popper.</div>
          </Fade>
        )}
      </PopperComponent>
    </div>
  );
};

export default {
  title: 'DataDisplay/Popper',
  component: PopperCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => <PopperCmp {...args} />;

export const Popper = Template.bind({});
Popper.args = {};
