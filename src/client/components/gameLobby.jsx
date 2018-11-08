import React from "react";
import { Link } from "react-router-dom";
import openSocket from 'socket.io-client';

class GameLobby extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.socket = openSocket(window.location.origin);
    }


    render() {
        return(
            <div>
                <h3>Game Lobby</h3>
                <Link to="/createGame">Create a new game</Link>             
            </div>
        )
    }
}

export default GameLobby;