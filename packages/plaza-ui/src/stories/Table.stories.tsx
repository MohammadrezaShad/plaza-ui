import {Meta, Story} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import TableCmp from '../components/Table';
import TableBody from '../components/TableBody';
import TableCell from '../components/TableCell';
import TableContainer from '../components/TableContainer';
import TableHead from '../components/TableHead';
import TableRow from '../components/TableRow';

const Wrap = styled.div`
  max-height: 300px;
`;

const TableTest = () => (
  <div
    style={{
      width: '700px',
    }}
  >
    <TableContainer component={Wrap}>
      <TableCmp>
        <TableHead>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>{' '}
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
            <TableCell>محمدرضا</TableCell>
          </TableRow>
        </TableBody>
      </TableCmp>
    </TableContainer>
  </div>
);

export default {
  title: 'DataDisplay/Table',
  component: TableTest,
  argTypes: {},
} as Meta;

const Template: Story = args => <TableTest {...args} />;

export const Table = Template.bind({});

Table.args = {};
