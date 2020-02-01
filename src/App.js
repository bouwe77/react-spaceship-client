import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-recipes";
import Spaceship from "./Spaceship";
import { getDefaultSpaceships } from "./api/api";

function App() {
  const [spaceships, setSpaceships] = useState([]);
  const [selectedSpaceship, setSelectedSpaceship] = useLocalStorage(
    "selectedSpaceship"
  );

  useEffect(() => {
    async function get() {
      const defaultSpaceships = await getDefaultSpaceships();
      setSpaceships(defaultSpaceships);
    }
    get();
  }, []);

  return (
    <>
      <select
        onChange={event => setSelectedSpaceship(event.target.value)}
        value={selectedSpaceship}
      >
        <option key={0}></option>
        {spaceships.map(spaceship => (
          <option key={spaceship.spaceshipId} value={spaceship.spaceshipId}>
            {spaceship.spaceshipId}
          </option>
        ))}
      </select>
      {selectedSpaceship && (
        <div>
          <Spaceship spaceshipId={selectedSpaceship} />
        </div>
      )}
    </>
  );
}

export default App;
