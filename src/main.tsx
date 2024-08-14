import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/utils/store";
import { Toaster } from "react-hot-toast";

// Ensure `document.getElementById("root")` is of type `HTMLElement`
const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" reverseOrder={false} /> 
    </BrowserRouter>
  </Provider>
);
