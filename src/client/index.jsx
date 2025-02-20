import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";

import App from "./app";

//REDUX
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );



ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>, 
    document.getElementById("root")
);