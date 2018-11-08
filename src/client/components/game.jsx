import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Game extends React.Component {
    constructor(props) {
        super(props);
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
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        inGame: state.gameReducer.inGame,
        gameId: state.gameReducer.gameId,
        waitingForPlayers: state.gameReducer.waitingForPlayers
    }
}

export default withRouter(connect(mapStateToProps)(Game));