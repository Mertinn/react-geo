import styled from "styled-components";
import v from "../variables";

export const StyledSlider = styled.input.attrs({ type: "range" })`
  appearance: none;
  background: rgba(0, 0, 0, 0.1);
  outline: none;
  height: 3px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${v.primaryColor};
    filter: brightness(1.3);
    opacity: 0.9;
    cursor: pointer;
    box-shadow: 0 0 0 5px rgba(66, 68, 90, 0.3);
    transition: 200ms;

    &:active {
      box-shadow: 0 0 0 7px rgba(66, 68, 90, 0.4);
    }
  }
`;

export const SliderContainer = styled.div`
  position: relative;
`;
