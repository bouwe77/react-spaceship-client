import React, { useState, useEffect } from "react";
import useServer from "./hooks/useServer";
import Console from "./Console";

export default ({ spaceshipId }) => {
  const [speed, setSpeed] = useState(0);
  const [destination, setDestination] = useState();
  const [destinationX, setDestinationX] = useState(0);
  const [destinationY, setDestinationY] = useState(0);
  const [position, destinationReached, messages] = useServer(
    spaceshipId,
    speed,
    destination
  );

  const possibleSpeeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    //if (destinationReached) setSpeed(0);
  }, [destinationReached]);

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <h3>Speed</h3>
          </td>
          <td>
            {possibleSpeeds.map(possibleSpeed => (
              <button
                key={possibleSpeed}
                onClick={() => setSpeed(possibleSpeed)}
              >
                {possibleSpeed}
              </button>
            ))}{" "}
            {speed}
          </td>
        </tr>
        <tr>
          <td>
            <h3>Destination</h3>
          </td>
          <td>
            <input
              type="text"
              value={destinationX}
              onChange={event => setDestinationX(Number(event.target.value))}
            />
            <input
              type="text"
              value={destinationY}
              onChange={event => setDestinationY(Number(event.target.value))}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button
              onClick={() =>
                setDestination({ x: destinationX, y: destinationY })
              }
            >
              <h1>Engage! :)</h1>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Position</h3>
          </td>
          <td>
            {position.x},{position.y}
          </td>
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
