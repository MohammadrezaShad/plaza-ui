import {Meta, Story} from '@storybook/react';
import React from 'react';
import {Link} from 'react-router-dom';

import BreadcrumbsCmp from '../components/Breadcrumbs';

export default {
  title: 'Navigation/Breadcrumbs',
  component: BreadcrumbsCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <BreadcrumbsCmp {...args}>
    <Link to="/">خانه</Link>
    <Link to="/">لوازم جانبی موبایل و تبلت</Link>
    <Link to="/">محافظ صفحه نمایش</Link>
  </BreadcrumbsCmp>
);

export const Breadcrumbs = Template.bind({});
