import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Navigation} from "./navigation";
import {Home} from "./home";
import {Leaderboard} from "./leaderboard";
import {NotFound} from "./notFound";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/leaderboard" component={Leaderboard}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));