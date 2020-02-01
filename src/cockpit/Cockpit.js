import React, { useState, useEffect } from "react";
import "../styles.css";
import RadioButton from "../ui/RadioButton";
import useServer from "../hooks/useServer";
import { getSpaceObjects } from "../api/api";

export default ({ spaceshipId, engineMode, updateEngineMode }) => {
  const [updateCourse, currentPosition] = useServer(spaceshipId);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [speed, setSpeed] = useState("");
  const [spaceObjects, setSpaceObjects] = useState([]);

  function engage(event) {
    event.preventDefault();
    if (!x || isNaN(x) || !y || isNaN(y) || !speed || isNaN(speed)) return;
    console.log("updating course...");
    updateCourse({ x, y }, speed);
  }

  useEffect(() => {
    async function get() {
      const result = await getSpaceObjects();
      setSpaceObjects(result);
    }
    get();
  }, []);

  return (
    <div className="cockpit">
      <div className="engineModePanel">
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
      <div className="navigationPanel">
        <div>
          CurrentPosition: ({currentPosition.position.x},
          {currentPosition.position.y})
        </div>
        <form onSubmit={engage}>
          <div>
            <label>
              Planet/Space Station
              <select>
                {spaceObjects.map(spaceObject => (
                  <option key={spaceObject.name} value={spaceObject.name}>
                    {spaceObject.name} ({spaceObject.type})
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Coordinates
              <input
                type="text"
                value={x}
                onChange={event => setX(event.target.value)}
              />
              <input
                type="text"
                value={y}
                onChange={event => setY(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Speed
              <input
                type="text"
                value={speed}
                onChange={event => setSpeed(event.target.value)}
              />
            </label>
          </div>
          <div>
            <button type="submit">GO!</button>
          </div>
        </form>
      </div>
    </div>
  );
};
