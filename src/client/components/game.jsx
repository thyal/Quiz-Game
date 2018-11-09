import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import openSocket from 'socket.io-client';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.socket = openSocket(window.location.origin);
        this.socket.emit('game', this.props.gameId);

    }

    render() {
        return(
            <div>
                <h3>GAME</h3>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        inGame: state.gameReducer.inGame,
        gameId: state.gameReducer.gameId,
        waitingForPlayers: state.gameReducer.waitingForPlayers
    }
}

export default withRouter(connect(mapStateToProps)(Game));