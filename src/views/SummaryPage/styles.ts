import styled from "styled-components";
import { statsContainer } from "../../components/mixins";

export const SummaryContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 70%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  ${statsContainer};
`;

export const Map = styled.div`
  width: 100%;
  height: 200px;
`;
