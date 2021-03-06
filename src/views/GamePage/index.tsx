import React, { useEffect, useRef, useState } from "react";
import Sidemap from "../../components/Sidemap";
import { randomLocations, usCenter } from "../../geoData";
import { useLocations } from "../../contexts/locationsContext";
import { useNavigate } from "react-router-dom";
import { useGameSettings } from "../../contexts/gameSettingsContext";
import useTimer from "../../hooks/useTimer";
import { useBonusPoints } from "../../contexts/bonusPointsContext";
import { initialize, whenLoaded } from "bing-maps-loader";

const key = process.env.REACT_APP_API_KEY!;
const defaultCoords = {
  streetView: {
    latitude: 0,
    longitude: 0,
  },
  map: usCenter,
};

initialize(key);

const GamePage = () => {
  const mapRef = useRef<Microsoft.Maps.Map | null>(null);
  const streetsideRef = useRef<Microsoft.Maps.Map | null>(null);
  const [guessMessage, setGuessMessage] = useState("");
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [mapBlockedParts, setMapBlockedParts] = useState({
    buttonsPanel: false,
    map: false,
    button: false,
  });
  const [mapForceOpacity, setMapForceOpacity] = useState(false);
  const [isLocationGuessed, setIsLocationGuessed] = useState(false);
  const { locations, addLocation } = useLocations();
  const { settings } = useGameSettings();
  const history = useNavigate();
  const timer = useTimer();
  const { setBonusPoints } = useBonusPoints();

  const addPushpin = (
    geoLocation: { latitude: number; longitude: number },
    title: string,
    reset: boolean
  ) => {
    if (!mapRef.current) return;

    const location = new Microsoft.Maps.Location(
      geoLocation.latitude,
      geoLocation.longitude
    );

    const pin = new Microsoft.Maps.Pushpin(location, {
      title: title,
    });

    if (reset) {
      mapRef.current.entities.setPrimitives([pin]);
    } else {
      mapRef.current.entities.push(pin);
    }
  };

  const loadStreetLocation = (location: Microsoft.Maps.Location) => {
    if (!streetsideRef.current) return;

    streetsideRef.current.setView({ center: location });
  };

  const handleSubmit = () => {
    if (!mapRef.current) return;

    addPushpin({ ...defaultCoords.streetView }, "Location", false);

    const pushpins = mapRef.current.entities.getPrimitives() as any;

    if (!Array.isArray(pushpins)) return;

    const polyline = new Microsoft.Maps.Polyline(
      [pushpins[0].getLocation(), pushpins[1].getLocation()],
      { strokeThickness: 2 }
    );
    mapRef.current.entities.push(polyline);

    Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", () => {
      if (!mapRef.current) return;

      const distance = Math.round(
        Microsoft.Maps.SpatialMath.getDistanceTo(
          pushpins[0].getLocation(),
          pushpins[1].getLocation(),
          Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers
        )
      );
      setGuessMessage(`${distance} kilometers away`);
      addLocation({
        distance,
        index: currentLocationIndex,
        locationData: pushpins[0].getLocation(),
        guessData: pushpins[1].getLocation(),
      });
      const centroid = new Microsoft.Maps.Pushpin(
        Microsoft.Maps.SpatialMath.Geometry.centroid(polyline)
      );

      const clamp = (min: number, max: number, number: number) => {
        if (number < min) {
          return min;
        } else if (number > max) {
          return max;
        }
        return number;
      };

      const zoom = Math.round(clamp(3, 6, (2000 / distance) * 1.5));
      mapRef.current.setView({
        zoom: zoom,
        center: centroid.getLocation(),
      });
    });

    setMapBlockedParts({ map: true, buttonsPanel: true, button: false });
    setMapForceOpacity(true);
    setIsLocationGuessed(true);
  };

  const handleNext = () => {
    console.log(locations.length, settings);

    if (locations.length === settings.rounds) {
      history("/summary");
    }

    let randomIndex = 0;
    for (;;) {
      randomIndex = Math.floor(Math.random() * randomLocations.length);

      if (locations.length === randomLocations.length) {
        return;
      }

      if (!locations.some((location) => location.index === randomIndex)) {
        break;
      }
    }

    const randomLocation = randomLocations[randomIndex];

    defaultCoords.streetView = randomLocation;
    loadStreetLocation(
      new Microsoft.Maps.Location(
        randomLocation.latitude,
        randomLocation.longitude
      )
    );
    setIsLocationGuessed(false);
    setMapBlockedParts({ map: false, button: false, buttonsPanel: false });
    setMapForceOpacity(false);
    setGuessMessage("");
    setCurrentLocationIndex(randomIndex);
    mapRef.current?.entities.clear();
    mapRef.current?.setView({ zoom: 3 });
  };

  const handleLoad = () => {
    const randomIndex = Math.floor(Math.random() * randomLocations.length);
    defaultCoords.streetView = randomLocations[randomIndex];
    setCurrentLocationIndex(randomIndex);

    mapRef.current = new Microsoft.Maps.Map("#sidemap", {
      credentials: key,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      disableStreetside: true,
      center: new Microsoft.Maps.Location(
        defaultCoords.map.latitude,
        defaultCoords.map.longitude
      ),
      zoom: 3,
      showBreadcrumb: false,
      showDashboard: false,
      showLogo: false,
      showScalebar: false,
      showLocateMeButton: false,
      showTermsLink: false,
      showMapTypeSelector: false,
      showTrafficButton: false,
      showZoomButtons: false,
    });
    Microsoft.Maps.Events.addHandler(mapRef.current, "click", (e) => {
      if (!e || !("location" in e) || !mapRef.current) return;

      addPushpin(
        {
          latitude: e.location.latitude,
          longitude: e.location.longitude,
        },
        "Your guess",
        true
      );
    });

    streetsideRef.current = new Microsoft.Maps.Map("#street-view", {
      credentials: key,
      mapTypeId: Microsoft.Maps.MapTypeId.streetside,
      streetsideOptions: {
        showExitButton: false,
        showCurrentAddress: false,
        showProblemReporting: false,
        overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden,
      },
      center: new Microsoft.Maps.Location(
        defaultCoords.streetView.latitude,
        defaultCoords.streetView.longitude
      ),
    });
  };

  useEffect(() => {
    whenLoaded.then(() => {
      handleLoad();
    });
  }, []);

  useEffect(() => {
    if (timer.time === settings.time * 60) {
      let bonusPoints = 0;
      for (let i = 0; i < settings.rounds - locations.length; i++) {
        bonusPoints -= 1000;
      }

      setBonusPoints(bonusPoints);

      history("/summary");
    }
  }, [timer.time]);

  return (
    <>
      <div id="street-view" style={{ width: "100%", height: "100vh" }} />
      <Sidemap
        id={"sidemap"}
        onSubmit={isLocationGuessed ? handleNext : handleSubmit}
        message={guessMessage}
        setBlockedParts={setMapBlockedParts}
        blockedParts={mapBlockedParts}
        forceOpacity={mapForceOpacity}
        buttonText={isLocationGuessed ? "Next" : "Guess"}
        time={`${timer.time}/${settings.time * 60}`}
      />
    </>
  );
};

export default GamePage;

// Function to generate random location,
// currently checking if there is a street side view on a given location is impossible
// const getRandomLocation = () => {
//   const northwest = new Microsoft.Maps.Location(
//       usData.bounds[0].latitude,
//       usData.bounds[0].longitude
//   );
//   const southeast = new Microsoft.Maps.Location(
//       usData.bounds[2].latitude,
//       usData.bounds[2].longitude
//   );
//   const usRect = Microsoft.Maps.LocationRect.fromCorners(
//       northwest,
//       southeast
//   );
//
//   let generatedLocation: Microsoft.Maps.Location =
//       null as unknown as Microsoft.Maps.Location;
//
//   return new Promise<Microsoft.Maps.Location>((resolve) => {
//     Microsoft.Maps.loadModule(
//         "Microsoft.Maps.SpatialDataService",
//         async () => {
//           const geoDataRequestOptions = {
//             getAllPolygons: true,
//             getEntityMetadata: true,
//           };
//
//           for (;;) {
//             generatedLocation = Microsoft.Maps.TestDataGenerator.getLocations(
//                 1,
//                 usRect
//             ) as Microsoft.Maps.Location;
//             try {
//               await new Promise<void>((resolveS, rejectS) => {
//                 if (!mapRef.current) return;
//
//                 Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(
//                     generatedLocation,
//                     geoDataRequestOptions,
//                     mapRef.current,
//                     (data) => {
//                       if (
//                           data.results.length === 1 &&
//                           data.results[0].EntityID === usData.entityId.toString()
//                       ) {
//                         resolve(generatedLocation);
//                       } else {
//                         rejectS();
//                       }
//                     }
//                 );
//               });
//               break;
//             } catch (e) {
//               continue;
//             }
//           }
//         }
//     );
//   });
// };
