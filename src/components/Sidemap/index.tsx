import React from "react";
import { Button, ButtonsList, Map, MessageBox, SideContainer } from "./styles";
import { MdOutlineBlock } from "react-icons/md";

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

  return (
    <SideContainer
      opacityBlock={
        blockedParts.map || blockedParts.button || blockedParts.buttonsPanel
      }
      forceOpacity={forceOpacity}
    >
      <ButtonsList isBlocked={blockedParts.buttonsPanel}>
        <li onClick={handleBasicBlock}>
          <MdOutlineBlock size={30} fill={"white"} />
        </li>
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
