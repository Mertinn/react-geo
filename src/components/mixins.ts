import { css } from "styled-components";
import v from "./variables";

export const pointerEvents = (isBlocked: boolean) => css`
  pointer-events: ${isBlocked ? "none" : "auto"};
`;

export const statsContainer = css`
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const mobileHidden = css`
  @media (max-width: ${v.devices.small}) {
    display: none;
  }
`;

export const desktopHidden = css`
  @media (min-width: calc(${v.devices.small} + 1px)) {
    display: none;
  }
`;
