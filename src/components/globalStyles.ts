import styled, { AnyStyledComponent } from "styled-components";
import v from "./variables";
import { desktopHidden, mobileHidden } from "./mixins";

export const Button = styled.button<{ shadowColor?: string }>`
  border: none;
  outline: none;
  background: ${v.primaryColor};
  filter: brightness(1.15);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;

  transition: 300ms cubic-bezier(0.17, 0.67, 0.39, 1.84);
  &:hover {
    transform: translateY(-10%);
    box-shadow: 0 20px 25px 0 ${(props) => props.shadowColor};
  }
`;

Button.defaultProps = {
  shadowColor: "rgba(0, 0, 0, 0.5)",
};
