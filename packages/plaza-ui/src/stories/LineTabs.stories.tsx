import {Meta, Story} from '@storybook/react';
import React, {useState} from 'react';

import Tab from '../components/LineTab';
import TabsComponent from '../components/LineTabs';
import TabPanel from '../components/TabPanel/TabPanel';

const TabsExample = () => {
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.MouseEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <TabsComponent value={value} onChange={handleChange}>
        <Tab />
        <Tab />
        <Tab />
      </TabsComponent>
      <TabPanel index={0} value={value}>
        red
      </TabPanel>
      <TabPanel index={1} value={value}>
        blue
      </TabPanel>
      <TabPanel index={2} value={value}>
        green
      </TabPanel>
    </>
  );
};

export default {
  title: 'Navigation/LineTabs',
  component: TabsComponent,
  argTypes: {},
} as Meta;

const Template: Story = args => <TabsExample {...args} />;

export const LineTabs = Template.bind({});
