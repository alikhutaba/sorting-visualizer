import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Components/Main/Main";
import * as serviceWorker from "./serviceWorker";

import { createStore } from "redux";
import allReduces from "./myRedux";
import { Provider } from "react-redux";

const store = createStore(
  allReduces,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
