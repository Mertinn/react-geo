import React, { createContext, ReactNode, useContext, useState } from "react";

interface IContext {
  settings: { time: number; rounds: number };
  setSettings: React.Dispatch<React.SetStateAction<IContext["settings"]>>;
}

const GameSettingsContext = createContext(null as unknown as IContext);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<IContext["settings"]>({
    time: 5,
    rounds: 5,
  });

  return (
    <GameSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = () => useContext(GameSettingsContext);
