import { css } from "styled-components";

export const pointerEvents = (isBlocked: boolean) => css`
  pointer-events: ${isBlocked ? "none" : "auto"};
`;
