import React, { useEffect, useRef, useState } from "react";
import Sidemap from "./components/Sidemap";
import { randomLocations } from "./geoData";

const key = "AjcL6XYYflPR9PsoE4ioQusD0JJD896-Bnr0n9r-q5F63MqrwOKoceYANF7ystn-";
const defaultCoords = {
  streetView:
    randomLocations[Math.floor(Math.random() * randomLocations.length)],
  map: {
    latitude: 37.09024,
    longitude: -95.712891,
  },
};

function App() {
  const mapRef = useRef<Microsoft.Maps.Map | null>(null);
  const streetsideRef = useRef<Microsoft.Maps.Map | null>(null);
  const [guessMessage, setGuessMessage] = useState("");
  const [mapBlockedParts, setMapBlockedParts] = useState({
    buttonsPanel: false,
    map: false,
    button: false,
  });
  const [mapForceOpacity, setMapForceOpacity] = useState(false);
  const [isLocationGuessed, setIsLocationGuessed] = useState(false);

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

    const pushpins = mapRef.current.entities.getPrimitives();

    if (!Array.isArray(pushpins)) return;

    const polyline = new Microsoft.Maps.Polyline(
      // @ts-ignore
      [pushpins[0].getLocation(), pushpins[1].getLocation()],
      { strokeThickness: 2 }
    );
    mapRef.current.entities.push(polyline);

    Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", () => {
      const distance = Microsoft.Maps.SpatialMath.getDistanceTo(
        // @ts-ignore
        pushpins[0].getLocation(),
        // @ts-ignore
        pushpins[1].getLocation(),
        Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers
      );
      setGuessMessage(`${Math.round(distance)} kilometers away`);
    });

    setMapBlockedParts({ map: true, buttonsPanel: true, button: false });
    setMapForceOpacity(true);
    setIsLocationGuessed(true);
  };

  const handleNext = () => {
    const randomLocation =
      randomLocations[Math.floor(Math.random() * randomLocations.length)];

    defaultCoords.streetView = randomLocation;
    loadStreetLocation(
      new Microsoft.Maps.Location(
        randomLocation.latitude,
        randomLocation.longitude
      )
    );
  };

  const handleLoad = () => {
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
    // const script = document.getElementById("microsoft");
    // if (!script) return;
    //
    // script.addEventListener("load", () => handleLoad());
    handleLoad();
  }, []);

  return (
    <div className="App">
      <button onClick={() => handleNext()}>debu</button>
      <div id="street-view" style={{ width: "100%", height: "100vh" }} />
      <Sidemap
        id={"sidemap"}
        onSubmit={() => handleSubmit()}
        message={guessMessage}
        isMessageShown={guessMessage !== ""}
        setBlockedParts={setMapBlockedParts}
        blockedParts={mapBlockedParts}
        forceOpacity={mapForceOpacity}
        buttonText={isLocationGuessed ? "Next" : "Guess"}
      />
    </div>
  );
}

export default App;

// Function to generate random location, currently checking if there is a
// street side view on a given location is impossible
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
