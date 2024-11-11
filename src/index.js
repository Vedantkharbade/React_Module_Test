import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
