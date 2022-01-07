import styled from "styled-components";
import v from "../../components/variables";

export const SettingsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
