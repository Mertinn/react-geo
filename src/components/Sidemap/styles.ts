import styled from "styled-components";
import { pointerEvents } from "../mixins";
import v from "../variables";

interface IisBlocked {
  isBlocked: boolean;
}

interface IisShown {
  isShown: boolean;
}

export const SideContainer = styled.div<{
  opacityBlock: boolean;
  forceOpacity: boolean;
}>`
  position: absolute;
  left: 10px;
  bottom: 20%;
  width: 30%;
  height: auto;
  transition: 200ms;
  opacity: ${(props) => (props.forceOpacity ? 1 : 0.2)};

  &:hover {
    ${(props) => !props.opacityBlock && !props.forceOpacity && "opacity: 1;"}
  }

  @media (max-width: ${v.devices.small}) {
    top: 0;
    left: 0;
  }
`;

export const Map = styled.div<IisBlocked & IisShown>`
  width: 100%;
  height: 30vh;
  position: relative;
  transition: 300ms;
  ${(props) => pointerEvents(props.isBlocked)}

  @media (max-width: ${v.devices.small}) {
    height: ${(props) => (props.isShown ? "50vh !important" : "0 !important")};
  }
`;

export const Button = styled.button<IisBlocked>`
  margin-top: 0.5rem;
  width: 100%;
  background: ${v.primaryColor};
  border: none;
  outline: none;
  padding: 1rem 0.5rem;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  ${(props) => pointerEvents(props.isBlocked)}
  @media (max-width: ${v.devices.small}) {
    display: none;
  }
`;

export const ButtonsList = styled.ul<IisBlocked>`
  margin-bottom: 0.5rem;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  ${(props) => pointerEvents(props.isBlocked)};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MessageBox = styled.div<{ isShown: boolean }>`
  position: absolute;
  top: 0;
  background: ${v.primaryColor + "d1"};
  color: white;
  width: 100%;
  z-index: 999;
  text-align: center;
  transition: 400ms;
  padding: ${(props) => (props.isShown ? "1rem" : 0)};
  height: ${(props) => (props.isShown ? "auto" : 0)};
`;
