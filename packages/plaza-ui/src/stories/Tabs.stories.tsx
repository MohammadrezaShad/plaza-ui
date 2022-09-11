import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel/TabPanel';
import TabsComponent from '../components/Tabs';

const TabItem = styled.div``;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsExample = () => {
  const [value, setValue] = useState<number>(0);
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any,
  ) => {
    setValue(newValue);
  };
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{width: '200px', marginBottom: '20px'}}>
        <TabsComponent
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
        >
          <Tab {...a11yProps(0)}>red</Tab>
          <Tab {...a11yProps(1)}>blue</Tab>
          <Tab {...a11yProps(2)}>green</Tab>
          <Tab {...a11yProps(3)}>yellow</Tab>
          <Tab {...a11yProps(4)}>white</Tab>
        </TabsComponent>
      </div>
      <TabPanel index={0} value={value}>
        red
      </TabPanel>
      <TabPanel index={1} value={value}>
        blue
      </TabPanel>
      <TabPanel index={2} value={value}>
        green
      </TabPanel>
      <TabPanel index={2} value={value}>
        green
      </TabPanel>
    </div>
  );
};

export default {
  title: 'Lab/Tabs',
  component: TabsComponent,
  argTypes: {},
} as Meta;

const Template: Story = args => <TabsExample {...args} />;

export const Tabs = Template.bind({});
