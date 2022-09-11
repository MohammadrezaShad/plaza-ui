import {Meta, Story} from '@storybook/react';
import React from 'react';

import Accordion from '../components/Accordion';
import AccordionDetails from '../components/AccordionDetails';
import AccordionSummary from '../components/AccordionSummary';
import Typography from '../components/Typography';

export default {
  title: 'DataDisplay/Accordion',
  component: Accordion,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div style={{width: '300px'}}>
    <Accordion {...args}>
      <AccordionSummary aria-controls="panel1a-content">
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion {...args}>
      <AccordionSummary aria-controls="panel1a-content">
        <Typography>Accordion 2</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  </div>
);

export const AccordionStory = Template.bind({});

AccordionStory.args = {};
