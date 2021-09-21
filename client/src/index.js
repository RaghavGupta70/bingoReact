import React from "react"
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"
import { applyMiddleware,compose,createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App.js";
import {reducers} from "./reducers";
import './index.css';


const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>
      <Router>
          <App />
      </Router>
    </Provider>,document.getElementById("root"));