import React from "react";
import Cockpit from "./Cockpit";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Spaceship spaceshipId="Spaceship 1" />
      <Spaceship spaceshipId="Spaceship 2" />
    </div>
  );
}

function Spaceship({ spaceshipId }) {
  return (
    <div
      style={{
        display: "initial",
        margin: "30px",
        padding: "10px",
        backgroundColor: "lightgrey"
      }}
    >
      <h1>{spaceshipId}</h1>
      <Cockpit spaceshipId={spaceshipId} />
    </div>
  );
}

export default App;
