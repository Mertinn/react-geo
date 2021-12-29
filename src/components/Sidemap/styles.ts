import styled from "styled-components";

export const SideContainer = styled.div<{ isBlocked: boolean }>`
  position: absolute;
  left: 10px;
  bottom: 20%;
  width: 30%;
  height: auto;
  transition: 200ms;
  opacity: 0.2;

  &:hover {
    ${(props) => (props.isBlocked ? null : "opacity: 1")}
  }
`;

export const Map = styled.div`
  width: 100%;
  height: 30vh;
`;

export const Button = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  background: #6cb928;
  border: none;
  outline: none;
  padding: 1rem 0.5rem;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

export const ButtonsList = styled.ul`
  margin-bottom: 0.5rem;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);

  & > * {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }
`;
