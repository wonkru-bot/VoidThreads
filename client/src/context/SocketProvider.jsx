import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({});

export function SocketProvider({ children }) {
  const socket = io(import.meta.REACT_APP_SERVER_URL, {
    autoConnect: false,
    auth: {
      token: '',
      userName: ''
    }
  })

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
