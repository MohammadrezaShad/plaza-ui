import {Meta, Story} from '@storybook/react';
import React from 'react';

import Slider from '../components/Slider';

export default {
  title: 'LAB/Slider',
  component: Slider,
  argTypes: {},
} as Meta;

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

function RangeSlider(props: any) {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        background: 'black',
      }}
    >
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        orientation="horizontal"
        marks={marks}
        isRtl
        {...props}
      />
    </div>
  );
}

function SimpleSlider(props: any) {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        background: 'black',
      }}
    >
      <Slider value={value} onChange={handleChange} {...props} />
    </div>
  );
}

function DiscreteSlider(props: any) {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        background: 'black',
      }}
    >
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </div>
  );
}

function RestrictedSlider(props: any) {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        background: 'black',
      }}
    >
      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        {...props}
      />
    </div>
  );
}

function VerticalRangeSlider(props: any) {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        background: 'black',
      }}
    >
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        orientation="vertical"
        marks={marks}
        {...props}
      />
    </div>
  );
}

function DisabledSlider(props: any) {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        background: 'black',
      }}
    >
      <Slider value={value} onChange={handleChange} disabled {...props} />
    </div>
  );
}

function InvertedSlider(props: any) {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        padding: '50px',
        background: 'black',
      }}
    >
      <Slider
        value={value}
        onChange={handleChange}
        track="inverted"
        {...props}
      />
    </div>
  );
}

const DefaultTemplate: Story = args => <SimpleSlider />;
const Template: Story = args => <RangeSlider />;
const DiscreteTemplate: Story = args => <DiscreteSlider />;
const RestrictedTemplate: Story = args => <RestrictedSlider />;
const VerticalTemplate: Story = args => <VerticalRangeSlider />;
const DisabledTemplate: Story = args => <DisabledSlider />;
const InvertedTemplate: Story = args => <InvertedSlider />;

export const Default = DefaultTemplate.bind({});
export const Double = Template.bind({});
export const Discrete = DiscreteTemplate.bind({});
export const Restricted = RestrictedTemplate.bind({});
export const Vertical = VerticalTemplate.bind({});
export const Disabled = DisabledTemplate.bind({});
export const Inverted = InvertedTemplate.bind({});
