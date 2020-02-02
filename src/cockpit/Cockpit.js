import React, { useState, useEffect } from "react";
import "../styles.css";
import RadioButton from "../ui/RadioButton";
import useServer from "../hooks/useServer";
import { getSpaceObjects } from "../api/api";

export default ({ spaceshipId, engineMode, updateEngineMode }) => {
  const [updateCourse, currentPosition, getCourse] = useServer(spaceshipId);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [speed, setSpeed] = useState("");
  const [spaceObjects, setSpaceObjects] = useState([]);
  const [selectedSpaceObject, setSelectedSpaceObject] = useState();
  const [destinationReached, setDestinationReached] = useState(false);

  function engage(event) {
    event.preventDefault();
    if (!x || isNaN(x) || !y || isNaN(y) || !speed || isNaN(speed)) return;
    updateCourse({ x, y }, speed);
  }

  function handleSpaceObjectChange(event) {
    const selectedSpaceObject = event.target.value;
    setSelectedSpaceObject(selectedSpaceObject);

    if (!selectedSpaceObject) return;

    const spaceObject = spaceObjects.find(
      spaceObject => spaceObject.name === selectedSpaceObject
    );
    setX(spaceObject.positionX);
    setY(spaceObject.positionY);
  }

  useEffect(() => {
    async function get() {
      const result = await getSpaceObjects();
      setSpaceObjects(result);
    }
    get();
  }, []);

  useEffect(() => {
    async function get() {
      const course = await getCourse();
      setSpeed(course.speed);
      setX(course.destinationX);
      setY(course.destinationY);
    }
    get();
  }, [getCourse]);

  useEffect(() => {
    if (currentPosition.destinationReached && !destinationReached) {
      if (speed !== 0) setSpeed(0);
    }
    setDestinationReached(currentPosition.destinationReached);
  }, [currentPosition, destinationReached, speed]);

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
        <form onSubmit={engage}>
          <div>
            <label>
              Planet/Space Station
              <select
                onChange={handleSpaceObjectChange}
                value={selectedSpaceObject}
              >
                <option key="-" value=""></option>

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
      <div className="locationPanel">
        <div>
          CurrentPosition: ({currentPosition.position.x},
          {currentPosition.position.y})
        </div>
        <div>Location: {currentPosition.location || "-"}</div>
        <div>
          Destination reached:{" "}
          {currentPosition.destinationReached ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
};
