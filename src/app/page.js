"use client";
import React from "react";
import { Provider } from "react-redux";

import App from "./App.jsx";
import { store } from "./redux/store";

export default function Home() {
  <Provider store={store}>
    <App />
  </Provider>;
}
