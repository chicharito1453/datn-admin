import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import myReducer from "./store/reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const store = createStore(myReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
