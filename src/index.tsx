import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { LocationsProvider } from "./contexts/locationsContext";
import { GameSettingsProvider } from "./contexts/gameSettingsContext";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  body {
    background: #353539;
  }
  
  svg { 
    display: block;
  }
  
  ul {
    list-style-type: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <LocationsProvider>
      <GameSettingsProvider>
        <App />
      </GameSettingsProvider>
    </LocationsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
