import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import openSocket from 'socket.io-client';
import { gameActions } from "../actions/gameActions";

class GameLobby extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        
        const { dispatch } = this.props;
        dispatch(gameActions.getActiveGames());
    }

    handleClick(id) {
        const { dispatch } = this.props;
        dispatch(gameActions.joinGame(id, this.props.history));
    }

    render() {

        let games = <div></div>;

        if(this.props.games !== undefined) {
            games = 
            <div>
                <table className="tbl-active-games">
                    <thead>
                        <tr>
                            <th>Game id</th>
                            <th>Name</th>
                            <th>Number of questions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.games.map(e => 
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.numberOfQuestions}</td>
                                <td><button onClick={() => this.handleClick(e.id)}>JOIN</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        }

        return(
            <div>
                <div>
                    <h3>Game Lobby</h3>
                    <Link to="/createGame">Create a new game</Link>  
                </div>           
                <div>
                    <h3>List of active games</h3>
                    {games}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        games: state.gameReducer.games
    }
}

export default withRouter(connect(mapStateToProps)(GameLobby));