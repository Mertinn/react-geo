import React from "react";
import { Button } from "../../components/globalStyles";
import Slider from "../../components/Slider";
import {
  SettingContainer,
  SettingHeader,
  SettingsContainer,
  SettingValue,
} from "./styles";
import { createGlobalStyle } from "styled-components";
import { useGameSettings } from "../../contexts/gameSettingsContext";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background: url('https://reddicediaries.com/wp-content/uploads/2019/10/evening-landscape-13530956185Aw.jpg');
    backdrop-filter: blur(60px);
    height: 100vh;
  }
`;

const HomePage = () => {
  const history = useNavigate();
  const { settings, setSettings } = useGameSettings();

  return (
    <>
      <GlobalStyle />
      <SettingsContainer>
        <SettingContainer>
          <SettingHeader>Rounds</SettingHeader>
          <SettingValue>{settings.rounds}</SettingValue>
          <Slider
            min={1}
            max={10}
            onChange={(value) => setSettings({ ...settings, rounds: value })}
            defaultValue={settings.rounds}
          />
        </SettingContainer>

        <SettingContainer>
          <SettingHeader>Time (minutes)</SettingHeader>
          <SettingValue>{settings.time}</SettingValue>
          <Slider
            min={1}
            max={30}
            onChange={(value) => setSettings({ ...settings, time: value })}
            defaultValue={settings.time}
          />
        </SettingContainer>

        <Button
          shadowColor={"rgba(59,160,52,0.3)"}
          onClick={() => history("/game")}
        >
          Start
        </Button>
      </SettingsContainer>
    </>
  );
};

export default HomePage;
