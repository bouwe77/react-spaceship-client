import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const useServer = spaceshipId => {
  const [currentPosition, setCurrentPosition] = useState({ position: {} });
  //const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  function updateCourse(destination, speed) {
    socketRef.current.emit("setCourse", { spaceshipId, destination, speed });
  }

  // Connect to the socket server when the spaceshipId changes.
  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_API_URL}:9876`, {
      forceNew: true
    });
    socketRef.current.emit("joinRoom", spaceshipId);
    console.log(`${spaceshipId} joined the room`);

    socketRef.current.on("disconnect", () => {
      console.log("disconnected...");
      socketRef.current.connect();
    });

    socketRef.current.on("CurrentPositionUpdated", currentPosition => {
      console.log("currentPosition", currentPosition);
      setCurrentPosition(currentPosition);
    });

    //socketRef.current.on("MessageSentFromServer", message =>
    //  setMessages(messages => [message, ...messages])
    //);

    return () => {
      socketRef.current.off("CurrentPositionUpdated");
      socketRef.current.off("MessageSentFromServer");
    };
  }, [spaceshipId]);

  return [updateCourse, currentPosition];
};

export default useServer;
