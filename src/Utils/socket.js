import { io } from "socket.io-client";

const createSocketConnection = () => {
  return io("http://localhost:3000");
};

export default createSocketConnection;
