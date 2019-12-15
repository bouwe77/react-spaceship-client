import React, { useState } from "react";
import useServer from "./hooks/useServer";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Client clientId="Client 1" />
      <Client clientId="Client 2" />
    </div>
  );
}

function Client({ clientId }) {
  const [speed, setSpeed] = useState(0);
  const [destination, setDestination] = useState(0);
  const [position] = useServer(clientId, speed, destination);

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
      <table>
        <tr>
          <td>
            <h3>Speed</h3>
          </td>
          <td>
            <button onClick={() => setSpeed(speed - 1)}>-</button>
            {speed}
            <button onClick={() => setSpeed(speed + 1)}>+</button>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Destination</h3>
          </td>
          <td>
            <button onClick={() => setDestination(destination - 10)}>-</button>
            {destination}
            <button onClick={() => setDestination(destination + 10)}>+</button>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Position</h3>
          </td>
          <td>{position}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
