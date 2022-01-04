import styled from "styled-components";
import { pointerEvents } from "../mixins";

interface IisBlocked {
  isBlocked: boolean;
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
`;

export const Map = styled.div<IisBlocked>`
  width: 100%;
  height: 30vh;
  position: relative;
  ${(props) => pointerEvents(props.isBlocked)}
`;

export const Button = styled.button<IisBlocked>`
  margin-top: 0.5rem;
  width: 100%;
  background: #6cb928;
  border: none;
  outline: none;
  padding: 1rem 0.5rem;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  ${(props) => pointerEvents(props.isBlocked)}
`;

export const ButtonsList = styled.ul<IisBlocked>`
  margin-bottom: 0.5rem;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  ${(props) => pointerEvents(props.isBlocked)},

  li {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }
`;

export const MessageBox = styled.div<{ isShown: boolean }>`
  position: absolute;
  top: 0;
  background: rgba(108, 185, 40, 0.8);
  color: white;
  width: 100%;
  z-index: 999;
  text-align: center;
  transition: 400ms;
  padding: ${(props) => (props.isShown ? "1rem" : 0)};
  height: ${(props) => (props.isShown ? "auto" : 0)};
`;
