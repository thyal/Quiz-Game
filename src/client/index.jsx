import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";

import {Navigation} from "./navigation";
import {Home} from "./home";
import {Leaderboard} from "./leaderboard";
import {NotFound} from "./notFound";
import {Login} from "./login";
import {Signup} from "./signup";

//REDUX
const store = createStore(rootReducer);

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
                        <Route exact path="/login" component={Login}/>
                        <Route exact pat="/signup" component={Signup}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));