import React, { useState } from "react";
import { Button, ButtonsList, Map, MessageBox, SideContainer } from "./styles";
import { MdOutlineBlock } from "react-icons/md";

interface IProps {
  id: string;
  onSubmit: () => void;
  isMessageShown: boolean;
  message: string;
}

const Sidemap = ({ id, onSubmit, message, isMessageShown }: IProps) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isOpacityForced, setIsOpacityForced] = useState(false);

  const handleSubmit = () => {
    onSubmit();
    setIsBlocked(true);
    setIsOpacityForced(true);
  };

  return (
    <SideContainer isBlocked={isBlocked} isOpacityForced={isOpacityForced}>
      <ButtonsList>
        <li onClick={() => setIsBlocked(!isBlocked)}>
          <MdOutlineBlock size={30} fill={"white"} />
        </li>
      </ButtonsList>
      <Map id={id}>
        <MessageBox isShown={isMessageShown}>
          <p>{message}</p>
        </MessageBox>
      </Map>
      <Button onClick={handleSubmit}>Guess</Button>
    </SideContainer>
  );
};

export default Sidemap;
