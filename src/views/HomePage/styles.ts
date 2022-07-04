import styled from "styled-components";
import { statsContainer } from "../../components/mixins";

export const SettingsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.3);
  ${statsContainer};
`;

export const SettingContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;
export const SettingHeader = styled.h1`
  font-size: 1.5rem;
`;

export const SettingValue = styled.p`
  font-size: 1.2rem;
`;
