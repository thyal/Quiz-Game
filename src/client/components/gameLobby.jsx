import React from "react";
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
            </div>
        )
    }
}

export default GameLobby;