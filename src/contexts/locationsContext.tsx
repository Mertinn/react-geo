import { createContext, ReactNode, useContext, useState } from "react";

interface ILocation {
  distance: number;
  index: number;
}

interface IContext {
  locations: ILocation[];
  addLocation: (location: ILocation) => void;
}

const LocationsContext = createContext<IContext>(null as unknown as IContext);

export const LocationsProvider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<IContext["locations"]>([]);

  const addLocation = (location: ILocation) => {
    setLocations((prevState) => [...prevState, location]);
  };

  return (
    <LocationsContext.Provider value={{ locations, addLocation }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => useContext(LocationsContext);
