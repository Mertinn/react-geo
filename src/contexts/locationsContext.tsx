import { createContext, ReactNode, useContext, useState } from "react";

interface ILocation {
  distance: number;
  index: number;
  locationData: Microsoft.Maps.Location;
  guessData: Microsoft.Maps.Location;
}

interface IContext {
  locations: ILocation[];
  addLocation: (location: ILocation) => void;
  setLocations: (locations: ILocation[]) => void;
}

const LocationsContext = createContext<IContext>(null as unknown as IContext);

export const LocationsProvider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<IContext["locations"]>([]);

  const addLocation = (location: ILocation) => {
    setLocations((prevState) => [...prevState, location]);
  };

  return (
    <LocationsContext.Provider value={{ locations, addLocation, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => useContext(LocationsContext);
