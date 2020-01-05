import React, { useState } from "react";
import Cockpit from "./cockpit/Cockpit";
import Engine from "./engine/Engine";

export default ({ spaceshipId }) => {
  const [showCockpit, setShowCockpit] = useState(true);
  const [engineMode, setEngineMode] = useState("idle");

  function updateEngineMode(mode) {
    const possibleModes = ["idle", "thrusters", "impulse"];
    if (possibleModes.includes(mode)) setEngineMode(mode);
  }

  return (
    <div>
      <h1>{spaceshipId}</h1>
      <button onClick={() => setShowCockpit(!showCockpit)}>
        Toggle Cockpit / Engine
      </button>
      <br />
      <br />
      <div>
        {showCockpit ? (
          <Cockpit
            spaceshipId={spaceshipId}
            engineMode={engineMode}
            updateEngineMode={updateEngineMode}
          />
        ) : (
          <Engine mode={engineMode} />
        )}
      </div>
    </div>
  );
};
