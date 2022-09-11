import {Meta, Story} from '@storybook/react';
import React from 'react';

import {CircularProgress as Circular} from '../components/ProgressIndicators';

export default {
  title: 'Feedback/Circular',
  component: Circular,
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
    variant: {
      options: ['determinate', 'indeterminate'],
      defaultValue: 'determinate',
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
      defaultValue: true,
      control: {type: 'boolean'},
    },
    size: {
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      control: {type: 'radio'},
    },
  },
} as Meta;

const Template: Story = args => <Circular {...args} />;

export const CircularProgress = Template.bind({});
