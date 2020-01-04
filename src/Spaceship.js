import React, { useState } from "react";
import Cockpit from "./Cockpit";
import Engine from "./Engine";

export default ({ spaceshipId }) => {
  const [showCockpit, setShowCockpit] = useState(true);

  return (
    <div>
      <h1>{spaceshipId}</h1>
      <button onClick={() => setShowCockpit(!showCockpit)}>
        Toggle Cockpit / Engine
      </button>
      <br />
      <br />
      <div>
        {showCockpit ? <Cockpit spaceshipId={spaceshipId} /> : <Engine />}
      </div>
    </div>
  );
};
