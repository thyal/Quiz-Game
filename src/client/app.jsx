import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Navigation from "./components/navigation";
import Home from "./components/home";
import Leaderboard from "./components/leaderboard";
import {NotFound} from "./components/notFound";
import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
import GameLobby from "./components/gameLobby";
import CreateGame from "./components/createGame";
import Game from "./components/game";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Navigation />
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/gameLobby" component={GameLobby}/>
                            <Route exact path="/createGame" component={CreateGame}/>
                            <Route exact path="/game/:id" component={Game}/>
                            <Route exact path="/leaderboard" component={Leaderboard}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={Signup}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;