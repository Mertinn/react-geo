import React from "react";
import { Map } from "./styles";

interface IProps {
  id: string;
}

const Sidemap = ({ id }: IProps) => {
  return (
    <>
      <Map id={id} />
    </>
  );
};

export default Sidemap;
