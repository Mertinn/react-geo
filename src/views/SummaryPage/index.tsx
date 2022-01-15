import React, { Suspense, useEffect, useRef, useState } from "react";
import { SummaryContainer, Map } from "./styles";
import { useLocations } from "../../contexts/locationsContext";
import { Canvas } from "@react-three/fiber";
import Earth from "../../components/Earth";
import { createGlobalStyle } from "styled-components";
import { Stars } from "@react-three/drei";
import { usCenter } from "../../geoData";
import { Button } from "../../components/globalStyles";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }
`;

const key = process.env.REACT_APP_API_KEY!;
const SummaryPage = () => {
  const { locations } = useLocations();
  const mapRef = useRef<Microsoft.Maps.Map | null>(null);
  const [points, setPoints] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    mapRef.current = new Microsoft.Maps.Map("#map", {
      credentials: key,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      disableStreetside: true,
      center: new Microsoft.Maps.Location(
        usCenter.latitude,
        usCenter.longitude
      ),
      zoom: 2,
      showBreadcrumb: false,
      showDashboard: false,
      showLogo: false,
      showScalebar: false,
      showLocateMeButton: false,
      showTermsLink: false,
      showMapTypeSelector: false,
      showTrafficButton: false,
      showZoomButtons: false,
      disablePanning: true,
      disableZooming: true,
    });

    const addConnectedPushpins = (pushpins: Microsoft.Maps.Pushpin[]) => {
      if (!mapRef.current) return;

      const polyline = new Microsoft.Maps.Polyline(
        [pushpins[0].getLocation(), pushpins[1].getLocation()],
        { strokeThickness: 2 }
      );

      mapRef.current.entities.push(polyline);
      mapRef.current.entities.push(pushpins);
    };

    let pointsNumber = 0;
    for (const location of locations) {
      pointsNumber = pointsNumber + 5000 - location.distance * 5;

      const locationPin = new Microsoft.Maps.Pushpin(location.locationData);
      const guessPin = new Microsoft.Maps.Pushpin(location.guessData);
      addConnectedPushpins([locationPin, guessPin]);
    }
    setPoints(pointsNumber);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Canvas
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
        }}
      >
        <pointLight position={[8, 5, 8]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <Suspense fallback={null}>
          <Earth position={[-5, -5, -10]} scale={0.9} />
        </Suspense>
      </Canvas>

      <SummaryContainer>
        <h1>You got {points} points!</h1>
        <Map id={"map"} />
        <Button
          shadowColor={"rgba(59,160,52,0.3)"}
          onClick={() => history("/")}
        >
          Play again
        </Button>
      </SummaryContainer>
    </>
  );
};

export default SummaryPage;
