import React, { useState } from "react";
import { Button, ButtonsList, Map, SideContainer } from "./styles";
import { MdOutlineBlock } from "react-icons/md";

interface IProps {
  id: string;
  onSubmit: () => void;
}

const Sidemap = ({ id, onSubmit }: IProps) => {
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <SideContainer isBlocked={isBlocked}>
      <ButtonsList>
        <li onClick={() => setIsBlocked(!isBlocked)}>
          <MdOutlineBlock size={30} fill={"white"} />
        </li>
      </ButtonsList>
      <Map id={id} />
      <Button onClick={onSubmit}>Guess</Button>
    </SideContainer>
  );
};

export default Sidemap;
