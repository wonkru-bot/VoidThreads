import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({});
console.log(import.meta.env.VITE_REACT_APP_SERVER_URL)
export function SocketProvider({ children }) {
  const socket = io(import.meta.env.VITE_REACT_APP_SERVER_URL, { // Accessing environment variable directly from import.meta.env
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

export default SocketContext;
