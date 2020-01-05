import React from "react";
import styles from "./Cockpit.module.css";
import RadioButton from "../ui/RadioButton";

export default ({ spaceshipId, engineMode, updateEngineMode }) => {
  return (
    <div className={styles.cockpit}>
      <div className={styles.engineModePanel}>
        <div>
          <RadioButton
            value="idle"
            currentValue={engineMode}
            onChecked={updateEngineMode}
          >
            Idle
          </RadioButton>
        </div>
        <div>
          <RadioButton
            value="thrusters"
            currentValue={engineMode}
            onChecked={updateEngineMode}
          >
            Thrusters
          </RadioButton>
        </div>
        <div>
          <RadioButton
            value="impulse"
            currentValue={engineMode}
            onChecked={updateEngineMode}
          >
            Impulse
          </RadioButton>
        </div>
      </div>
    </div>
  );
};
