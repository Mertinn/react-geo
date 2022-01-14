import React, { useState } from "react";
import {
  Button,
  ButtonsList,
  HiddenDesktopLi,
  HiddenMobileLi,
  Map,
  MessageBox,
  SideContainer,
} from "./styles";
import { MdOutlineBlock } from "react-icons/md";
import { AiOutlineArrowDown } from "react-icons/ai";

interface IProps {
  id: string;
  onSubmit: () => void;
  isMessageShown: boolean;
  message: string;
  blockedParts: { buttonsPanel: boolean; map: boolean; button: boolean };
  setBlockedParts: React.Dispatch<React.SetStateAction<IProps["blockedParts"]>>;
  forceOpacity: boolean;
  buttonText: string;
}

const Sidemap = ({
  id,
  onSubmit,
  message,
  isMessageShown,
  blockedParts,
  setBlockedParts,
  forceOpacity,
  buttonText,
}: IProps) => {
  const [isShown, setIsShown] = useState(false);

  const handleSubmit = () => {
    onSubmit();
  };

  const handleBasicBlock = () => {
    setBlockedParts({
      button: !blockedParts.button,
      buttonsPanel: false,
      map: !blockedParts.map,
    });
  };

  const iconsData = {
    size: 30,
    fill: "white",
  };

  return (
    <SideContainer
      opacityBlock={
        blockedParts.map || blockedParts.button || blockedParts.buttonsPanel
      }
      forceOpacity={forceOpacity}
      isMapShown={isShown}
    >
      <ButtonsList isBlocked={blockedParts.buttonsPanel}>
        <HiddenMobileLi onClick={handleBasicBlock}>
          <MdOutlineBlock size={iconsData.size} fill={iconsData.fill} />
        </HiddenMobileLi>

        <HiddenDesktopLi onClick={() => setIsShown((prevState) => !prevState)}>
          <AiOutlineArrowDown size={iconsData.size} fill={iconsData.fill} />
        </HiddenDesktopLi>
      </ButtonsList>

      <Map id={id} isBlocked={blockedParts.map}>
        <MessageBox isShown={isMessageShown}>
          <p>{message}</p>
        </MessageBox>
      </Map>

      <Button onClick={handleSubmit} isBlocked={blockedParts.button}>
        {buttonText}
      </Button>
    </SideContainer>
  );
};

export default Sidemap;
