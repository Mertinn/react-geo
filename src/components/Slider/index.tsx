import React, { useState } from "react";
import { SliderContainer, StyledSlider } from "./styles";

interface IProps {
  max: number;
  min: number;
  onChange: (value: number) => void;
  defaultValue: number;
}

const Slider = ({ max, min, onChange, defaultValue }: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange(value);
  };

  return (
    <>
      <StyledSlider
        max={max}
        min={min}
        onChange={(e) => handleChange(e)}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default Slider;
