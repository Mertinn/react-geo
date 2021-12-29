import React, { useEffect } from "react";

const key = "AjcL6XYYflPR9PsoE4ioQusD0JJD896-Bnr0n9r-q5F63MqrwOKoceYANF7ystn-";
const defaultCoords = {
  latitude: 39.8355,
  longitude: 99.0909,
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

    new Microsoft.Maps.Map("#map", {
      credentials: key,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      disableStreetside: true,
      center: new Microsoft.Maps.Location(
        defaultCoords.latitude,
        defaultCoords.longitude
      ),
      zoom: 1,
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
  }, []);

  return (
    <div className="App">
      <div id="street-view" style={{ width: "100%", height: "100vh" }} />
      <div
        id="map"
        style={{
          position: "absolute",
          left: 0,
          bottom: "20%",
          width: "30%",
          height: "30vh",
        }}
      />
    </div>
  );
}

export default App;
