import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const useServer = (spaceshipId, speed, destination) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([]);
  const [destinationReached, setDestinationReached] = useState(false);
  const socketRef = useRef();

  // Connect to the socket server when the spaceshipId changes.
  useEffect(() => {
    socketRef.current = io("http://localhost:8000", { forceNew: true });
    socketRef.current.emit("joinRoom", spaceshipId);
    console.log(`${spaceshipId} joined the room`);

    socketRef.current.on("disconnect", () => {
      console.log("disconnected...");
      socketRef.current.connect();
    });

    socketRef.current.on("CurrentPositionUpdated", position => {
      setPosition(position);
      setDestinationReached(false);
    });

    socketRef.current.on("MessageSentFromServer", message =>
      setMessages(messages => [message, ...messages])
    );

    socketRef.current.on("DestinationReached", () =>
      setDestinationReached(true)
    );

    return () => {
      socketRef.current.off("CurrentPositionUpdated");
      socketRef.current.off("MessageSentFromServer");
    };
  }, [spaceshipId]);

  // When the speed changes, send it to the server.
  useEffect(() => {
    socketRef.current.emit("updatedSpeed", { spaceshipId, speed });
  }, [spaceshipId, speed]);

  // When the destination changes, send it to the server.
  useEffect(() => {
    socketRef.current.emit("updatedDestination", { spaceshipId, destination });
  }, [spaceshipId, destination]);

  return [position, destinationReached, messages];
};

export default useServer;
