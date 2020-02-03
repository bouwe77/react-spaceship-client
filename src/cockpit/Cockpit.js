import React, { useState, useEffect } from "react";
import "../styles.css";
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
    setX(spaceObject.destinationX);
    setY(spaceObject.destinationY);
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
          <b>Engine mode</b>
        </div>
        <div>
          <input
            type="radio"
            value="idle"
            checked={engineMode === "idle"}
            onChange={() => updateEngineMode("idle")}
            id="idle"
          />
          <label htmlFor="idle">Idle</label>
        </div>
        <div>
          <input
            type="radio"
            value="thrusters"
            checked={engineMode === "thrusters"}
            onChange={() => updateEngineMode("thrusters")}
            id="thrusters"
          />
          <label htmlFor="thrusters">Thrusters</label>
        </div>
        <div>
          <input
            type="radio"
            value="impulse"
            checked={engineMode === "impulse"}
            onChange={() => updateEngineMode("impulse")}
            id="impulse"
          />
          <label htmlFor="impulse">Impulse</label>
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
