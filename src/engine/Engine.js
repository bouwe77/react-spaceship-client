import React from "react";
import styles from "./Engine.module.css";

export default ({ mode }) => {
  return (
    <div className={styles.engine}>
      <div className={styles.engineMonitor}>
        <h1>Engine mode:</h1> {mode}
      </div>
    </div>
  );
};
