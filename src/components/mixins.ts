import { css } from "styled-components";

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
