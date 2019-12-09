import React, { useState, useEffect } from "react";
import io from "socket.io-client";

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
  const [position, setPosition] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.emit("joinRoom", clientId);
    console.log(`${clientId} joined the room`);

    socket.on("CurrentPositionUpdated", position => {
      setPosition(position);
    });

    socket.on("message", message => {
      setMessage(message);
    });

    return () => {
      socket.off("CurrentPositionUpdated");
    };
  }, [clientId]);

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
      <h4>{message}</h4>
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
