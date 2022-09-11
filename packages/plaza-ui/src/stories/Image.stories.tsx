import {Meta, Story} from '@storybook/react';
import React from 'react';

import ImageCmp from '../components/Image';
import {ImageProps} from '../components/Image/Image';

export default {
  title: 'DataDisplay/Image',
  component: ImageCmp,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <div style={{width: '500px'}}>
    <ImageCmp {...(args as ImageProps)} />
  </div>
);

export const Image = Template.bind({});

Image.args = {
  src: 'https://cdn1.plaza.com/Handlers/Media/Photo/nokia-bl-6p-battery?defaultImage=1&mediaId=14751&size=360',
};
