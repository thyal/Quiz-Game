import React from "react";
import { Link } from "react-router-dom";

class GameLobby extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div>
                    <h3>Game Lobby</h3>
                    <Link to="/createGame">Create a new game</Link>  
                </div>           
                <div>
                    <h3>List of active games</h3>
                </div>
            </div>
        )
    }
}

export default GameLobby;