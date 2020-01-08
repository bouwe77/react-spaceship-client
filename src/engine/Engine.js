import React from "react";
import "../styles.css";

export default ({ mode }) => {
  return (
    <div className="engine">
      <div className="engineMonitor">
        <h1>Engine mode:</h1> {mode}
      </div>
    </div>
  );
};
