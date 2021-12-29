import React, { useEffect } from "react";
import Sidemap from "./components/Sidemap";

const key = "AjcL6XYYflPR9PsoE4ioQusD0JJD896-Bnr0n9r-q5F63MqrwOKoceYANF7ystn-";
const defaultCoords = {
  latitude: 37.09024,
  longitude: -95.712891,
};

function App() {
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

    const map = new Microsoft.Maps.Map("#sidemap", {
      credentials: key,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      disableStreetside: true,
      center: new Microsoft.Maps.Location(
        defaultCoords.latitude,
        defaultCoords.longitude
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
    Microsoft.Maps.Events.addHandler(map, "click", (e) => {
      if (!e || !("location" in e)) return;
      const location = new Microsoft.Maps.Location(
        e.location.latitude,
        e.location.longitude
      );

      const pin = new Microsoft.Maps.Pushpin(location, {
        title: "Your guess",
      });
      map.entities.setPrimitives([pin]);
    });
  }, []);

  return (
    <div className="App">
      <div id="street-view" style={{ width: "100%", height: "100vh" }} />
      <Sidemap id={"sidemap"} />
    </div>
  );
}

export default App;
