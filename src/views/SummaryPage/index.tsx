import React, { Suspense, useEffect, useRef, useState } from "react";
import { SummaryContainer, Map } from "./styles";
import { useLocations } from "../../contexts/locationsContext";
import { Canvas } from "@react-three/fiber";
import Earth from "../../components/Earth";
import { createGlobalStyle } from "styled-components";
import { Stars } from "@react-three/drei";
import { randomLocations } from "../../geoData";

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

  useEffect(() => {
    for (const location of locations) {
      setPoints((prevState) => prevState + 5000 - location.distance * 10);
    }

    mapRef.current = new Microsoft.Maps.Map("#map", {
      credentials: key,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
      disableStreetside: true,
      center: new Microsoft.Maps.Location(37.09024, -95.712891),
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
        <h1>You got {points} points</h1>
        <Map id={"map"} />
      </SummaryContainer>
    </>
  );
};

export default SummaryPage;
