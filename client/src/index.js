import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

if (process.env.NODE_ENV === "production") disableReactDevTools();
const isSSR = process.env.REACT_APP_SSR === "true";

const appElement = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <AuthProvider>
          <SocketProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </SocketProvider>
        </AuthProvider>
      </Router>
    </PersistGate>
  </Provider>
);

if (isSSR) {
  ReactDOM.hydrateRoot(document.getElementById("root"), appElement);
} else {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(appElement);
}
