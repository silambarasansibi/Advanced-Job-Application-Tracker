import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

const useSocket = (event, callback) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [socket, event, callback]);
};

export default useSocket;