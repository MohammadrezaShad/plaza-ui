import React, {forwardRef} from 'react';

import Slider from './Slider';

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

export default function RangeSlider() {
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
        disabled
        disableSwap
      />
    </div>
  );
}
