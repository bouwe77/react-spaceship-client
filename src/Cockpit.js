import React, { useState } from "react";
import useServer from "./hooks/useServer";
import Console from "./Console";

export default ({ spaceshipId }) => {
  const [speed, setSpeed] = useState(0);
  const [destination, setDestination] = useState(0);
  const [position, messages] = useServer(spaceshipId, speed, destination);

  return (
    <table>
      <tbody>
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
        <tr>
          <td colSpan="2">
            <h3>Console</h3>
          </td>
        </tr>
        <tr>
          <td>
            <Console messages={messages} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
