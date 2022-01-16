import React, { createContext, ReactNode, useContext, useState } from "react";

interface IContext {
  bonusPoints: number;
  setBonusPoints: React.Dispatch<React.SetStateAction<IContext["bonusPoints"]>>;
}

const BonusPointsContext = createContext(null as unknown as IContext);

export const BonusPointsProvider = ({ children }: { children: ReactNode }) => {
  const [bonusPoints, setBonusPoints] = useState(0);

  return (
    <BonusPointsContext.Provider value={{ bonusPoints, setBonusPoints }}>
      {children}
    </BonusPointsContext.Provider>
  );
};

export const useBonusPoints = () => useContext(BonusPointsContext);
