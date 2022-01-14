import styled from "styled-components";
import { statsContainer } from "../../components/mixins";
import v from "../../components/variables";

export const SummaryContainer = styled.div`
  position: absolute;
  top: 15%;
  right: 15%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  ${statsContainer};
  padding: 3rem;
  text-align: center;

  @media (max-width: ${v.devices.small}) {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
  }
`;

export const Map = styled.div`
  width: 100%;
  height: 200px;
`;
