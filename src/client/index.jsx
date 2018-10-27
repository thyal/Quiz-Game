import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Home} from "./home";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));