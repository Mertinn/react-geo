import React, { useEffect, useRef } from "react";
import Sidemap from "./components/Sidemap";

const key = "AjcL6XYYflPR9PsoE4ioQusD0JJD896-Bnr0n9r-q5F63MqrwOKoceYANF7ystn-";
const defaultCoords = {
  streetView: {
    latitude: 34.054713,
    longitude: -118.223331,
  },
  map: {
    latitude: 37.09024,
    longitude: -95.712891,
  },
};

function App() {
  const mapRef = useRef<Microsoft.Maps.Map | null>(null);

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

  const handleSubmit = () => {
    if (!mapRef.current) return;

    addPushpin({ ...defaultCoords.streetView }, "Location", false);

    const pushpins = Microsoft.Maps.TestDataGenerator.getPushpins(2);

    if (!Array.isArray(pushpins)) return;

    const polyline = new Microsoft.Maps.Polyline(
      [pushpins[0].getLocation(), pushpins[1].getLocation()],
      { strokeThickness: 2 }
    );
    mapRef.current.entities.push(polyline);

    Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", () => {
      console.log(
        Microsoft.Maps.SpatialMath.getDistanceTo(
          pushpins[0].getLocation(),
          pushpins[1].getLocation(),
          Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers
        )
      );
    });
  };

  useEffect(() => {
    new Microsoft.Maps.Map("#street-view", {
      credentials: key,
      mapTypeId: Microsoft.Maps.MapTypeId.streetside,
      streetsideOptions: {
        showExitButton: false,
        showCurrentAddress: false,
        showProblemReporting: false,
        disablePanoramaNavigation: false,
        overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden,
      },
      center: new Microsoft.Maps.Location(34.054713, -118.223331),
    });

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
  }, []);

  return (
    <div className="App">
      <div id="street-view" style={{ width: "100%", height: "100vh" }} />
      <Sidemap id={"sidemap"} onSubmit={() => handleSubmit()} />
    </div>
  );
}

export default App;
