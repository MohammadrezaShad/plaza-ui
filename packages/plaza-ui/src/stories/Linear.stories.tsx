import {Meta, Story} from '@storybook/react';
import React from 'react';

import {LinearProgress as Linear} from '../components/ProgressIndicators';

export default {
  title: 'Feedback/Linear',
  component: Linear,
  argTypes: {
    progressColor: {
      options: [
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
        'info',
        'link',
      ],
      defaultValue: 'primary',
      control: {type: 'select'},
    },
    direction: {
      options: ['rtl', 'ltr'],
      defaultValue: 'ltr',
      control: {type: 'select'},
    },
    trackColor: {
      options: [
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
        'stroke',
        'link',
      ],
      defaultValue: 'stroke',
      control: {type: 'select'},
    },
    value: {
      defaultValue: 0,
      control: {type: 'number'},
    },
    transition: {
      control: {type: 'number'},
    },
    highlightColor: {
      control: {type: 'color'},
    },
    trackHighlightColor: {
      control: {type: 'color'},
    },
    hasLabel: {
      control: {type: 'boolean'},
    },
    hasTransition: {
      control: {type: 'boolean'},
    },
    size: {
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      control: {type: 'radio'},
    },
  },
} as Meta;

const Template: Story = args => (
  <div style={{width: '200px'}}>
    <Linear {...args} />
  </div>
);

export const LinearProgress = Template.bind({});
