import React, { useState } from "react";
import { Button } from "../../components/globalStyles";
import Slider from "../../components/Slider";
import {
  SettingContainer,
  SettingHeader,
  SettingsContainer,
  SettingValue,
} from "./styles";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: url('https://reddicediaries.com/wp-content/uploads/2019/10/evening-landscape-13530956185Aw.jpg');
    backdrop-filter: blur(60px);
    height: 100vh;
  }
`;

const HomePage = () => {
  const [roundsNumber, setRoundsNumber] = useState(5);
  const [time, setTime] = useState(5);

  return (
    <>
      <GlobalStyle />
      <SettingsContainer>
        <SettingContainer>
          <SettingHeader>Rounds</SettingHeader>
          <SettingValue>{roundsNumber}</SettingValue>
          <Slider
            min={1}
            max={10}
            onChange={(value) => setRoundsNumber(value)}
            defaultValue={roundsNumber}
          />
        </SettingContainer>

        <SettingContainer>
          <SettingHeader>Time (minutes)</SettingHeader>
          <SettingValue>{time}</SettingValue>
          <Slider
            min={1}
            max={30}
            onChange={(value) => setTime(value)}
            defaultValue={time}
          />
        </SettingContainer>
        <Button shadowColor={"rgba(59,160,52,0.3)"}>Start</Button>
      </SettingsContainer>
    </>
  );
};

export default HomePage;
