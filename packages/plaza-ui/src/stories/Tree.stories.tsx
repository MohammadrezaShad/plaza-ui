import ExpandMoreIcon from '@plaza-ui/icons/lib/Chevron2Down';
import ChevronRightIcon from '@plaza-ui/icons/lib/Chevron2Left';
import {Meta, Story} from '@storybook/react';
import React, {ReactText} from 'react';

import {Grid} from '../components';
import Button from '../components/Button/Button';
import TreeItem from '../components/TreeItem';
import TreeView from '../components/TreeView';
import {useToast} from '../hooks/useToast';

type ToastComponentProps = {
  text?: string;
};

function TreeComponent() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      disableSelection
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}

export default {
  title: 'LAB/Tree',
  component: TreeComponent,
  argTypes: {},
} as Meta;

const Template: Story = args => <TreeComponent {...args} />;

export const Tree = Template.bind({});

Tree.args = {};
