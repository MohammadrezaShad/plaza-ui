import {Meta, Story} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import Grid from '../components/Grid';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
  padding: 20px;
  color: white;
`;

const Container = styled.div`
  width: 500px;
  display: flex;
`;

const breakpointSetting = {
  options: ['auto', true, false, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  control: {type: 'select'},
};

export default {
  title: 'Layout/Grid',
  component: Grid,
  argTypes: {
    justify: {
      options: [
        'center',
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      control: {type: 'select'},
    },
    alignContent: {
      options: [
        'center',
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'stretch',
      ],
      control: {type: 'select'},
    },
    alignItems: {
      options: ['center', 'flex-start', 'flex-end', 'baseline', 'stretch'],
      control: {type: 'select'},
    },
    direction: {
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      control: {type: 'select'},
    },
    wrap: {
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      control: {type: 'select'},
    },
    spacing: {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      control: {type: 'select'},
    },
    xxs: breakpointSetting,
    xs: breakpointSetting,
    sm: breakpointSetting,
    md: breakpointSetting,
    lg: breakpointSetting,
    xlg: breakpointSetting,
  },
} as Meta;

const TemplateChild: Story = args => (
  <Grid {...args} item>
    <Wrap>Grid</Wrap>
  </Grid>
);

const TemplateMain: Story = args => (
  <Container>
    <Grid {...args}>
      <TemplateChild />
      <TemplateChild />
      <TemplateChild />
    </Grid>
  </Container>
);

const TemplatePrimary: Story = args => (
  <Container>
    <Grid container wrap="wrap" spacing={3} {...args}>
      <TemplateChild {...args} />
      <TemplateChild {...args} />
      <TemplateChild {...args} />
    </Grid>
  </Container>
);

const TemplateBreakpoint: Story = args => (
  <Container>
    <Grid container wrap="wrap" spacing={{lg: 8, xxs: 5, xlg: 2}}>
      <TemplateChild {...args} />
      <TemplateChild {...args} />
      <TemplateChild {...args} />
    </Grid>
  </Container>
);

export const MainGrid = TemplateMain.bind({});
MainGrid.args = {
  container: true,
};

export const ChildGrid = TemplatePrimary.bind({});

export const ChildGridBreakpoints = TemplateBreakpoint.bind({});
