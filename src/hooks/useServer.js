import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const useServer = (clientId, speed, destination) => {
  const [position, setPosition] = useState(0);
  const socketRef = useRef();

  // Connect to the socket server when the clientId changes.
  useEffect(() => {
    socketRef.current = io("http://localhost:8000");
    socketRef.current.emit("joinRoom", clientId);
    console.log(`${clientId} joined the room`);

    socketRef.current.on("CurrentPositionUpdated", position => {
      setPosition(position);
    });

    socketRef.current.on("message", message => {
      console.log(message);
    });

    return () => {
      socketRef.current.off("CurrentPositionUpdated");
    };
  }, [clientId]);

  // When the speed changes, send it to the server.
  useEffect(() => {
    socketRef.current.emit("updatedSpeed", { clientId, speed });
  }, [clientId, speed]);

  // When the destination changes, send it to the server.
  useEffect(() => {
    socketRef.current.emit("updatedDestination", { clientId, destination });
  }, [clientId, destination]);

  return [position];
};

export default useServer;
