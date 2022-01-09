import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./views/GamePage";
import HomePage from "./views/HomePage";
import SummaryPage from "./views/SummaryPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/game"} element={<GamePage />} />
          <Route path={"/summary"} element={<SummaryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
