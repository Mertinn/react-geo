import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./views/GamePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/game"} element={<GamePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
