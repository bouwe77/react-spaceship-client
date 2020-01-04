import React from "react";
import Cockpit from "./Cockpit";
import Engine from "./Engine";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Spaceship spaceshipId="Spaceship 1" />
    </div>
  );
}

function Spaceship({ spaceshipId }) {
  return (
    <div>
      <h1>{spaceshipId}</h1>
      <Engine />
      <Cockpit spaceshipId={spaceshipId} />
    </div>
  );
}

export default App;
