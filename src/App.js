import React from "react";
import Cockpit from "./Cockpit";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Client clientId="Spaceship 1" />
      <Client clientId="Spaceship 2" />
    </div>
  );
}

function Client({ clientId }) {
  return (
    <div
      style={{
        display: "initial",
        margin: "30px",
        padding: "10px",
        backgroundColor: "lightgrey"
      }}
    >
      <h1>{clientId}</h1>
      <Cockpit clientId={clientId} />
    </div>
  );
}

export default App;
